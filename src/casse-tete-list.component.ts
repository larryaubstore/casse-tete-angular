import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';                                                             
  
import { CasseTete } from './casse-tete';
import { CasseTeteService } from './casse-tete.service';
  
@Component({
  selector: 'casse-tete-list',
  templateUrl: 'dist/template/casse-tete-list.html',                                                        
  styleUrls: ['assets/css/casse-tete-list.css']
}) 
export class CasseTeteListComponent implements OnInit {
  
  cassetetes: CasseTete[] = [];
  
  constructor(                                                                                        
    private _router: Router, 
    private _casseTeteService: CasseTeteService) {
  } 
  
  ngOnInit() {
    this.cassetetes = this._casseTeteService.getList();
  } 
  
  gotoDetail(casseTete: CasseTete) { 
    let link = ['CasseTeteList', { id: casseTete.id }];                                                       
    this._router.navigate(link);
  } 
} 

