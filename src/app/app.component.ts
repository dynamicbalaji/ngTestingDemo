import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngOnInit(){
    let numbers = Observable.interval(1000);

    numbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );
  }
}
