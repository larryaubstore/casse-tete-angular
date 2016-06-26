import {Component, View} from 'angular2/core';

@Component({
  selector: 'casse-tete'
})

@View({
  templateUrl: 'dist/templates/casse-tete.html',
  styleUrls: ['assets/css/puzzle.css']
})

export class CasseTeteComponent {

  constructor() {
    console.info('CasseTete Component Mounted Successfully');
  }

}
