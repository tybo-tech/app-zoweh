import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})
export class IntroPageComponent implements OnInit {
  slides: Slides[];
  index = 0;
  constructor(private router: Router) { }

  ngOnInit() {
    this.slides = [
      {
        Url: 'assets/images/slide1.png',
        Class: [],
        Selected: true
      },
      {
        Url: 'assets/images/slide2.png',
        Class: [],
        Selected: false
      },
      {
        Url: 'assets/images/slide3.png',
        Class: [],
        Selected: false
      },
      {
        Url: 'assets/images/slide4-1.png',
        Class: [],
        Selected: false
      },
    ];
  }

  select(i) {

  }

  next() {
    this.index++;
    this.slides.map(x => x.Selected = false);
    if (this.index >= this.slides.length) {
      this.router.navigate(['sign-in'])
      return false;
    }

    this.slides[this.index].Selected = true;
  }

  skip() {
    this.router.navigate(['sign-in']);
  }

}


export interface Slides {
  Url: string;
  Class: string[];
  Selected: boolean;
}