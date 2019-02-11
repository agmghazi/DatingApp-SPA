import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'app-Value',
  templateUrl: './Value.component.html',
  styleUrls: ['./Value.component.css']
})
export class ValueComponent implements OnInit {
values: any;
// tslint:disable-next-line: deprecation
  constructor(private http: Http) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://localhost:5001/api/values').subscribe(response => {
      this.values = response.json();
     });
  }
}
