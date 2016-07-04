import {Component} from 'angular2/core';

@Component({
  selector: 'casse-tete',
  templateUrl: 'dist/templates/casse-tete.html',
  styleUrls: ['assets/css/puzzle.css']
})

export class CasseTeteComponent {

  constructor() {
    console.info('CasseTete Component Mounted Successfully');
  }

}
