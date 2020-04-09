import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {timer} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ClockService {

     clock

    constructor() {
        this.clock = timer(0,10).subscribe(tick => new Date());
    }

    getClock(): Observable<Date> {
        return this.clock;
    }

}