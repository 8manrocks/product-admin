import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private service:InteractionService) { }

  ngOnInit(): void {
    this.service.loggedIn.next(false)
  }
  login() {
    this.service.loggedIn.next(true)
    this.router.navigate(['products']);
  }
}
