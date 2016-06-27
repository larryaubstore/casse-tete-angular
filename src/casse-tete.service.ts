import { Injectable } from 'angular2/core';

import { CasseTete } from './casse-tete';
import { CASSETETES } from './mock-casse-tetes';

@Injectable()
export class CasseTeteService {
  getList() {
    return CASSETETES;
  }
}
