import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';

import { SummerCampApi } from '../../shared/shared';

@Component({
  templateUrl: 'ranks.page.html',
})
export class RanksPage {
  allRanks: any[];
  divisionFilter = 'division';
  ranks: any[];
  school: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public eliteApi: SummerCampApi) { }

  ionViewDidLoad() { 
    this.school = this.navParams.data;
    let summerCampData = this.eliteApi.getCurrentTourney();
    this.ranks = summerCampData.ranks;

    // this.allRanks =
    //   _.chain(this.ranks)
    //    .groupBy('division')
    //    .toPairs()
    //    .map(item => _.zipObject(['divisionName', 'divisionRanks'], item))
    //    .value();

    console.log('ranks:', this.ranks); 
    //console.log('division Ranks', this.allRanks);
    this.allRanks = summerCampData.ranks;

    this.filterDivision(); 
  }

  filterDivision(){
    if(this.divisionFilter === 'all'){
      this.ranks = this.allRanks;
    } else {
      this.ranks = _.filter(this.allRanks, s => s.division === this.school.division);
    }
  }

  getHeader(record, recordIndex, records){
    if (recordIndex === 0 || record.division !== records[recordIndex-1].division) {
      return record.division;
    }
    return null;  
  }
}
