import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { SchoolsPage } from '../pages';
import { SummerCampApi } from '../../shared/shared';

@Component({
  templateUrl: 'summerCamps.page.html',
})
export class SummerCampsPage {

  summerCamps: any;
  
  constructor(
      public nav: NavController, 
      public eliteApi: SummerCampApi,
      public loadingController: LoadingController) { }

  itemTapped($event, summerCamp){
    this.nav.push(SchoolsPage, summerCamp); 
  }

  ionViewDidLoad(){
    let loader = this.loadingController.create({
      content: 'Getting summerCamps...'
      //spinner: 'dots'
    });

    loader.present().then(() => {
      this.eliteApi.getSummerCamps().then(data => {
        this.summerCamps = data;
        loader.dismiss();
      });
    });
    
  }

  
}
