import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InteractionService } from './interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn$!: Observable<boolean>;
  constructor(private router: Router, private service: InteractionService) {}
  ngOnInit(): void {
    this.loggedIn$ = this.service.loggedIn;
    this.router.navigate(['login'])
  }
  // signOut() {
  //   this.service.loggedIn.next(false)
  //   this.router.navigate(['login'])
  // }
  title = 'product-admin';
  isMenuCollapsed = true;
}
