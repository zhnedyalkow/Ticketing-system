import { Component, OnInit, ViewChild, Renderer, Inject, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
    }
}
