import { Component, ViewChild } from '@angular/core';
import { Events, LoadingController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

import { MySchoolsPage, SchoolHomePage, SummerCampsPage } from '../pages/pages';
import { SummerCampApi, UserSettings } from '../shared/shared';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteSchools: any[];
  rootPage: any;// = MySchoolsPage;


  constructor(
    public events: Events,
    public loadingController: LoadingController,
    public platform: Platform, 
    public eliteApi: SummerCampApi,
    public userSettings: UserSettings,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.userSettings.initStorage().then(() => {
        this.rootPage = MySchoolsPage;
        this.refreshFavorites();
        this.events.subscribe('favorites:changed', () => this.refreshFavorites());
      });

    });
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(favs => this.favoriteSchools = favs);
    //this.favoriteSchools = this.userSettings.getAllFavorites();
  }

  goHome() {
    this.nav.push(MySchoolsPage);
  }

  goToSchool(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getSummerCampData(favorite.summerCampId).subscribe(l => this.nav.push(SchoolHomePage, favorite.school));
  }

  goToSummerCamps() {
    this.nav.push(SummerCampsPage);
  }
}
