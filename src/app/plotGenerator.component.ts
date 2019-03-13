import { Component, OnInit } from '@angular/core';
import { ResourcesManagerService } from './resourcesManager.service';
import { IResource } from './resource';
import { ResourcesHttpService } from './resourcesHttp.service';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';


@Component({
  templateUrl: './plotGenerator.component.html'
})

export class PlotGeneratorComponent implements OnInit {

  resources: IResource[];
  title = '';
  story = '';
  storyLines = [];
  filmTitel = [];
  filmsInResources = [];

  constructor(
            public resourcesService: ResourcesManagerService,
            private service: ResourcesHttpService,
            private router: Router) {
    if (!this.resourcesService.resources || !this.resourcesService.resources.length) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.resources = this.resourcesService.getSelectedResources();
    this.getFilmData();
  }

  getFilmData(): void {
    const url = 'https://swapi.co/api/films/';
    let tempStory = '';

    this.resources.forEach(element => {
      if (!element.itemList) {
        return;
      }
      element.itemList.forEach(item => {
        item.films.forEach(film => {
          if (this.filmsInResources.indexOf(film) < 0) {
            this.filmsInResources.push(film);
          }
        });
      });
    });

    this.service.getResources(url).subscribe(
      (filmsData) => {
        filmsData.results.forEach(element => {
          if (this.filmsInResources.indexOf(element.url) > -1) {
            tempStory = tempStory + element.opening_crawl;
            this.filmTitel.push(element.title);
          }
        });
        this.storyLines = tempStory.replace(/\r\n/g, ' ').split('.');
        this.generateStory();
      }
    );
  }

  generateStory(): void {
    let num;
    this.story = '';
    this.title = ' ';

    for (let i = 0; i < 10; i++) {
      num = Math.floor(Math.random() * this.storyLines.length);
      if (this.story.indexOf(this.storyLines[num]) < 0) {
        this.story = this.story + this.storyLines[num] + '. ';
      }
    }

    num = Math.floor(Math.random() * this.filmTitel.length);
    this.title = this.filmTitel[num] || '';
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.resourcesService.reset();
    this.router.navigate(['/home']);
  }

}
