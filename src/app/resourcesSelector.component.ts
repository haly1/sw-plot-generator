import { Component} from '@angular/core';
import { IResource } from './resource';
import { ResourcesManagerService } from './resourcesManager.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './resourcesSelector.component.html'
})

export class ResourcesSelectorComponent {

  constructor(
    private resourcesManager: ResourcesManagerService,
    private router: Router
  ) {}

  availableResources: IResource[] = [
    {id: 'planets', displayName: 'Planets', url: 'https://swapi.co/api/planets/'},
    {id: 'people', displayName: 'Characters', url: 'https://swapi.co/api/people/'},
    {id: 'species', displayName: 'Species', url: 'https://swapi.co/api/species/'},
    {id: 'starships', displayName: 'Starships', url: 'https://swapi.co/api/starships/'},
    {id: 'vehicles', displayName: 'Vehicles', url: 'https://swapi.co/api/vehicles/'}
  ];

  validInput(): boolean {
    let valid = false;

    this.availableResources.forEach(element => {
      if (element.include) {
        valid = true;
      }
    });

    return valid;
  }

  navigateToResourcesList(): void {

    this.availableResources.forEach(element => {
      if (element.include) {
        this.resourcesManager.add(element);
      }
    });
    this.router.navigate(['/resources']);
  }
}





