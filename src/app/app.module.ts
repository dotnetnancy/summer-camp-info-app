import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CampSessionPage, MapPage, MySchoolsPage, RanksPage, SchoolDetailPage, SchoolHomePage, SchoolsPage, SummerCampsPage } from '../pages/pages';
import { SummerCampApi, SqlStorage, UserSettings } from '../shared/shared';


@NgModule({
  declarations: [
    MyApp,
    CampSessionPage,
    MapPage,
    MySchoolsPage,
    RanksPage,
    SchoolDetailPage,
    SchoolHomePage,
    SchoolsPage,
    SummerCampsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CampSessionPage,
    MapPage,
    MySchoolsPage,
    RanksPage,
    SchoolDetailPage,
    SchoolHomePage,
    SchoolsPage,
    SummerCampsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SummerCampApi,
    SqlStorage,
    UserSettings,
    SQLite
  ]
})
export class AppModule {}
