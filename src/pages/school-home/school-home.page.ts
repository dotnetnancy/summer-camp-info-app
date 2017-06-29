import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { /*MySchoolsPage,*/ RanksPage, SchoolDetailPage } from '../pages';

@Component({
  templateUrl: 'school-home.page.html',
})
export class SchoolHomePage {
  school: any;
  schoolDetailTab = SchoolDetailPage;
  ranksTab = RanksPage;

  constructor(public nav: NavController, public navParams: NavParams) {
    this.school =  this.navParams.data; 
  }

  goHome(){
    //this.nav.push(MySchoolsPage);
    this.nav.popToRoot();
  }
}
