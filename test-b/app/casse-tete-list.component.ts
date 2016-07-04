import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';                                                             
  
import { CasseTete } from './casse-tete';
import { CasseTeteService } from './casse-tete.service';
  
@Component({
  selector: 'casse-tete-list',
  templateUrl: 'app/dist/templates/casse-tete-piece.html', 
  styleUrls: ['assets/css/puzzle.css'],
  providers: [CasseTeteService]
}) 
export class CasseTeteListComponent implements OnInit {
  
  cassetetes: CasseTete[] = [];
  
  constructor(                                                                                        
    private _router: Router, 
    private _casseTeteService: CasseTeteService) {
  } 
  
  ngOnInit() {
    this.cassetetes = this._casseTeteService.getList();
    console.log(JSON.stringify(this.cassetetes));
  } 
  
  gotoDetail(casseTete: CasseTete) { 
    let link = ['CasseTeteList', { id: casseTete.id }];                                                       
    this._router.navigate(link);
  } 
} 

