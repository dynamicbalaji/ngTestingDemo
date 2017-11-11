import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  numberObsSub: Subscription;
  myObsSub: Subscription;

  ngOnInit(){
    let numbers = Observable.interval(1000);

    this.numberObsSub = numbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create( (observer: Observer<string>) => {
      setTimeout(observer.next('first package')
        , 3000);
      setTimeout(observer.next('second package')
        , 4000);
      // After error package, nothing will get sent, even complete package
      /* setTimeout(observer.error('error package')
        , 5000); */
      setTimeout(observer.complete()
        , 6000);
      // This package won't get sent as the observer is already marked as complete
      setTimeout(observer.next('fourth package')
        , 7000);
    } );

    this.myObsSub = myObservable.subscribe(
      (msg: string) => {console.log(msg);},
      (error: string) => {console.log(error);},
      () => {console.log('completed');}
    );
  }

  ngOnDestroy() {
    this.numberObsSub.unsubscribe();
    this.myObsSub.unsubscribe();
  }
}
