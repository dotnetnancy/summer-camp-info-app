import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';

import _ from 'lodash';
import moment from 'moment';

import { CampSessionPage } from '../pages';
import { SummerCampApi, UserSettings } from '../../shared/shared';

@Component({
  templateUrl: 'school-detail.page.html',
})
export class SchoolDetailPage {
  allCampSessions: any[];
  dateFilter: string;
  campSessions: any[];
  isFollowing = false;
  school: any = {};
  schoolRank: any = {}; 
  private summerCampData: any;
  useDateFilter = false;

  constructor(
    public alertController: AlertController,
    public nav: NavController, 
    public navParams: NavParams,
    public toastController: ToastController,
    public eliteApi: SummerCampApi,
    public userSettings: UserSettings) { }

  ionViewDidLoad(){
    this.school = this.navParams.data;
    this.summerCampData = this.eliteApi.getCurrentTourney();

    this.campSessions = _.chain(this.summerCampData.campSessions)
                  .filter(g => g.school1Id === this.school.id || g.school2Id === this.school.id)
                  .map(g => {
                      let isSchool1 = (g.school1Id === this.school.id);
                      let opponentName = isSchool1 ? g.school2 : g.school1;
                      let scoreDisplay = this.getScoreDisplay(isSchool1, g.school1Score, g.school2Score);
                      return {
                          campSessionId: g.id,
                          opponent: opponentName,
                          time: Date.parse(g.time),
                          location: g.location,
                          locationUrl: g.locationUrl,
                          scoreDisplay: scoreDisplay,
                          homeAway: (isSchool1 ? "vs." : "at")
                      };
                  })
                  .value();

    this.allCampSessions = this.campSessions;
    this.schoolRank = _.find(this.summerCampData.ranks, { 'schoolId': this.school.id });
    this.userSettings.isFavoriteSchool(this.school.id).then(value => this.isFollowing = value);
  }

  getScoreDisplay(isSchool1, school1Score, school2Score) {
        if (school1Score && school2Score) {
            var schoolScore = (isSchool1 ? school1Score : school2Score);
            var opponentScore = (isSchool1 ? school2Score : school1Score);
            var winIndicator = schoolScore > opponentScore ? "W: " : "L: ";
            return winIndicator + schoolScore + "-" + opponentScore;
        }
        else {
            return "";
        }
    }
  
  campSessionClicked($event, campSession){
    let sourceCampSession = this.summerCampData.campSessions.find(g => g.id === campSession.campSessionId);
    this.nav.parent.parent.push(CampSessionPage, sourceCampSession);
  } 

  getScoreWorL(campSession){
    return campSession.scoreDisplay ? campSession.scoreDisplay[0] : '';
  } 

  getScoreDisplayBadgeClass(campSession){
    //return campSession.scoreDisplay.indexOf('W:') === 0 ? 'badge-primary' : 'badge-danger';
    return campSession.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  } 

  dateChanged(){
    if (this.useDateFilter) {
      this.campSessions = _.filter(this.allCampSessions, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.campSessions = this.allCampSessions;
    } 
  }

  toggleFollow(){
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.userSettings.unfavoriteSchool(this.school);

              let toast = this.toastController.create({
                message: 'You have unfollowed this school.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present(); 
            }
          },
          { text: 'No' }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettings.favoriteSchool(
        this.school, 
        this.summerCampData.summerCamp.id, 
        this.summerCampData.summerCamp.name); 

    }
  } 

  refreshAll(refresher){
    this.eliteApi.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    });
  }
}
