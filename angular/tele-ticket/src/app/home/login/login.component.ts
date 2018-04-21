import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHomeService } from '../services/auth.home.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthHomeService, private router: Router) { }

  ngOnInit() {

  }

  loginUser(form: NgForm) {

    console.log(form.value);
    this.auth.login(form.value, { observe: 'response', responseType: 'json' }).subscribe((x: {
        message: string,
        token: string,
      }) => {
      console.log(x);
      if (x.message === 'ok') {
        localStorage.setItem('token', x.token);
        this.router.navigate(['./']);
      } else {
        alert(x.message);
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 302) {
        alert(err.error.err);
      }
    });
  }

}
