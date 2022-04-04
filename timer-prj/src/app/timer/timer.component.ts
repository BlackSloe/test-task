import { Component, OnInit } from '@angular/core';
import { interval, Subscription, timer} from 'rxjs';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  private seconds: number = 0;
  private minutes: number = 0;

  private secondsSubscribtion: Subscription | null;
  private minutesSubscription: Subscription | null;

  private clickTimeout: boolean = false;

  constructor() {
    this.secondsSubscribtion = null;
    this.minutesSubscription = null;
  }

  ngOnInit(): void { }

  getTime(): string {
    return this.getTimeString(this.minutes.toString(), this.seconds.toString());
  }

  private getTimeString(minutes: string, seconds: string): string {
    const minutesStr = minutes.length === 1 ? `0${minutes}` : minutes;
    const secondsStr = seconds.length === 1 ? `0${seconds}` : seconds;

    return `${minutesStr}: ${secondsStr}`;
  }

  startBtnClick(): void {
    this.secondsSubscribtion = interval(1000).subscribe(second => {
      if (++this.seconds === 60) {
        this.seconds = 0;
      }
    });

    this.minutesSubscription = interval(60 * 1000).subscribe(minute => {
      this.minutes++;
    });
  }

  stopBtnClick(): void {
    this.seconds = 0;
    this.minutes = 0;

    this.unsubscribe();
  }

  waitBtnClick(): void {
    if (!this.clickTimeout) {
      this.clickTimeout = true;

      timer(500).subscribe(val => { this.clickTimeout = false; });
      return;
    }

    timer(500).subscribe(val => {
      this.clickTimeout = false;

      this.unsubscribe();
    });
  }
  
  resetBtnClick(): void {
    this.seconds = 0;
    this.minutes = 0;
  }

  private unsubscribe(): void {
    if (this.secondsSubscribtion) {
      this.secondsSubscribtion.unsubscribe();
    }
    if (this.minutesSubscription) {
      this.minutesSubscription.unsubscribe();
    }
  }
}
