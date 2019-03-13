import { Component, OnInit, HostListener } from '@angular/core';
import { ResourcesHttpService } from './resourcesHttp.service';
import { ResourcesManagerService } from './resourcesManager.service';
import { Router } from '@angular/router';
import { IResource } from './resource';


@Component({
  templateUrl: './resourcesList.component.html'
})

export class ResourcesListComponent implements OnInit {

  statusMessage = '';
  searchResultMessage = '';
  searchText = '';
  serviceError = false;
  loadCompleted = true;

  constructor(
    public resourcesManager: ResourcesManagerService,
    private resourcesService: ResourcesHttpService,
    private router: Router) {
    if (!this.resourcesManager.resources || !this.resourcesManager.resources.length) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    const url = this.resourcesManager.currentResource.url;
    this._sendRequest(url);
  }

  hasNext(): boolean {
    return this.resourcesManager.hasNext();
  }

  missingItems(): boolean {
    let selectedItems: any[] = [];
    this.resourcesManager.resources.forEach((res: IResource) => {
      if (!res.itemList) {
        return;
      }
      selectedItems = selectedItems.concat(res.itemList.filter(item => item.isChecked === true));
    });

    return selectedItems.length ? false : true;
  }

  showNextList(): void {
    this.serviceError = false;
    const nextResourceData = this.resourcesManager.getNext();
    if (!nextResourceData.result || !nextResourceData.result.length) {
      this._sendRequest(nextResourceData.url);
    }
  }

  hasPreviouse(): boolean {
    return this.resourcesManager.hasPreviouse();
  }

  showPreviousList(): void {
    this.serviceError = false;
    const previousResourceData = this.resourcesManager.getPreviouse();
    if (!previousResourceData.result || !previousResourceData.result.length) {
      this._sendRequest(previousResourceData.url);
    }
  }

  hasMore(): boolean {
    return this.resourcesManager.hasMore();
  }

  showMore(): void {
    const url = this.resourcesManager.currentResource.next;
    this._sendRequest(url, true);
  }

  filter(): void {
    this.searchResultMessage = '';
    if (!this.searchText) {
      this.resourcesManager.currentResource.itemList = this.resourcesManager.currentResource.result;
    }

    this.resourcesManager.currentResource.itemList = Object
      .assign([], this.resourcesManager.currentResource.result)
      .filter(
       item => item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
      );
  }

  search(): void {
    this.statusMessage = 'Searching..';
    this.resourcesService.findResource(this.resourcesManager.currentResource.url, this.searchText).subscribe(
      (resourceData) => {
        if (!resourceData.results.length) {
          this.searchResultMessage = 'No ' + this.resourcesManager.currentResource.displayName + ' found';
        } else {
          this.resourcesManager.addToList(resourceData.results, true);
          this.filter();
        }
        this.statusMessage = '';
        this.serviceError = false;
      }, (error) => {
        this.serviceError = true;
        this.statusMessage =
            'Problem with the service. Please try again after sometime';
      }
    );
  }

  toogleCheck(checked: boolean, index: number): void {
    this.resourcesManager.currentResource.itemList[index].isChecked = checked;
  }

  navigateToPlotGenerator(): void {
    this.router.navigate(['/plotgen']);
  }

  private _sendRequest(url: string, abbend?: boolean): void {
    this.loadCompleted = false;
    this.statusMessage = 'Loading ' +  this.resourcesManager.currentResource.displayName + ' ...';
    this.resourcesService.getResources(url).subscribe(
      (resourceData) => {
        this.resourcesManager.setNextUrl(resourceData.next);
        this.resourcesManager.addToList(resourceData.results, abbend);
        this.resourcesManager.currentResource.itemList = this.resourcesManager.currentResource.result;
        this.filter();
        this.loadCompleted = true;
        this.serviceError = false;
        this.statusMessage = '';
      }, (error) => {
        this.serviceError = true;
        this.statusMessage =
            'Problem with the service. Please try again after sometime';
        this.loadCompleted = true;
      }
    );
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.resourcesManager.reset();
    this.router.navigate(['/home']);
  }

}
