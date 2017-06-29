import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MapPage, SchoolHomePage } from '../pages';
import { SummerCampApi } from '../../shared/shared';
declare var window: any;

@Component({
  templateUrl: 'campSession.page.html',
})
export class CampSessionPage {
  campSession: any = {};

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public eliteApi: SummerCampApi) { }

  ionViewDidLoad(){
    this.campSession = this.navParams.data;
    this.campSession.campSessionTime = Date.parse(this.campSession.time);
  }

  schoolTapped(schoolId){
    let summerCampData = this.eliteApi.getCurrentTourney();
    let school = summerCampData.schools.find(t => t.id === schoolId);
    this.nav.push(SchoolHomePage, school); 
  }

  goToDirections(){
    let summerCampData = this.eliteApi.getCurrentTourney();
    let location = summerCampData.locations[this.campSession.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap(){
    this.nav.push(MapPage, this.campSession);
  }

  isWinner(score1, score2){
    //return Number(score1) > Number(score2);
    return Number(score1) > Number(score2) ? 'secondary' : '';
  }
}
