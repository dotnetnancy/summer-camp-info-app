import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { SchoolHomePage, SummerCampsPage } from '../pages';
import { SummerCampApi, UserSettings } from '../../shared/shared';

@Component({
    templateUrl: 'my-schools.page.html'
})
export class MySchoolsPage {

    favorites = [];
    //     {
    //         school: { id: 6182, name: 'HC Summer Camp7th', coach: 'Michelotti' },
    //         summerCampId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
    //         summerCampName: 'March Madness SummerCamp'
    //     },
    //     {
    //         school: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
    //         summerCampId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
    //         summerCampName: 'Holiday Hoops Challenge'
    //     }
    // ];

    constructor(
        public loadingController: LoadingController,
        public nav: NavController,
        public eliteApi: SummerCampApi,
        public userSettings: UserSettings){}
    
    favoriteTapped($event, favorite){
        let loader = this.loadingController.create({
            content: 'Getting data...'
            //dismissOnPageChange: true //<- broken in RC4?
        });
        loader.present();
        this.eliteApi.getSummerCampData(favorite.summerCampId)
            .subscribe(t => {
                loader.dismiss();
                this.nav.push(SchoolHomePage, favorite.school);
            });
    }

    goToSummerCamps(){
        this.nav.push(SummerCampsPage); 
    }

    ionViewDidEnter(){
        //this.favorites = this.userSettings.getAllFavorites();
        this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
    }
}