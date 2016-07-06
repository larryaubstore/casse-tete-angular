import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { CasseTeteService }       from './casse-tete.service';

@Component({
  selector: 'casse-tete',
  templateUrl: 'app/dist/templates/casse-tete.html',
  styleUrls: ['assets/css/puzzle.css'],
  providers: [CasseTeteService]
})

export class CasseTeteComponent implements OnInit, OnDestroy {


  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _casseTeteService:  CasseTeteService
  ) {
    console.info('CasseTete Component Mounted Successfully');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

       let url = params['url']; // (+) converts string 'id' to a number
       console.log(url);
       let list = this._casseTeteService.getList();

       this._casseTeteService.getPieces(100, 100, 16, 'assets/css/20110403143837_rouedentelee.jpg');
       //this.service.getHero(id).then(hero => this.hero = hero);
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
