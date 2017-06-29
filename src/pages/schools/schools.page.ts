import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';

import { SchoolHomePage } from '../pages';
import { SummerCampApi } from '../../shared/shared';

@Component({
  templateUrl: 'schools.page.html',
})
export class SchoolsPage {
  private allSchools: any;
  private allSchoolDivisions: any;
  schools = [];
  queryText: string = '';
 

  constructor(public loadingController: LoadingController,
              public nav: NavController, 
              public navParams: NavParams,
              public eliteApi: SummerCampApi) { }

  ionViewDidLoad(){
    //console.log('**lodash debug', lodash, _); 
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.eliteApi.getSummerCampData(selectedTourney.id).subscribe(data => {
        this.allSchools = data.schools;
        this.allSchoolDivisions =
            _.chain(data.schools)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionSchools'], item))
            .value();

        this.schools = this.allSchoolDivisions;
        console.log('division schools', this.schools); 
        loader.dismiss();
      });
    });
    
  }

  itemTapped($event, school){
    this.nav.push(SchoolHomePage, school); 
  }

  updateSchools(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredSchools = [];
    _.forEach(this.allSchoolDivisions, td => {
      let schools = _.filter(td.divisionSchools, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (schools.length) {
        filteredSchools.push({ divisionName: td.divisionName, divisionSchools: schools });
      }
    });

    this.schools = filteredSchools;
  }
}
