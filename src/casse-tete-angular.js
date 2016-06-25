import {Component, View} from 'angular2/core';

@Component({
  selector: 'casse-tete-angular'
})

@View({
  templateUrl: 'casse-tete-angular.html'
})

export class CasseTeteAngular {

  constructor() {
    console.info('CasseTeteAngular Component Mounted Successfully');
  }

}
