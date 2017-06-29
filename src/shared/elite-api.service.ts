import { Injectable } from '@angular/core';
import { Http /*, Response*/ } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SummerCampApi {
    private baseUrl = 'https://summer-camp-info-app.firebaseio.com/';
    currentTourney: any = {};
    private summerCampData = {};

    constructor(public http: Http) { }

    getSummerCamps(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/summerCamps.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getSummerCampData(summerCampId, forceRefresh: boolean = false) : Observable<any> {
        if (!forceRefresh && this.summerCampData[summerCampId]) {
            this.currentTourney = this.summerCampData[summerCampId];
            console.log('**no need to make HTTP call, just return the data'); 
            return Observable.of(this.currentTourney);
        }

        // don't have data yet
        console.log('**about to make HTTP call');
        return this.http.get(`${this.baseUrl}/summerCamps-data/${summerCampId}.json`)
            .map(response => {
                this.summerCampData[summerCampId] = response.json();
                this.currentTourney = this.summerCampData[summerCampId];
                return this.currentTourney;
            });
    }

    getCurrentTourney(){
        return this.currentTourney;
    }

    refreshCurrentTourney(){
        return this.getSummerCampData(this.currentTourney.summerCamp.id, true); 
    }
}