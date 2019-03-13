import { Injectable, OnInit } from '@angular/core';
import { IResource } from './resource';

@Injectable()

export class ResourcesManagerService {

  currentResourceIndex = 0;
  resources: IResource[] = [];
  currentResource: IResource;

  setCurrentResource(index: number): void {
    this.currentResource = this.resources[index];
  }

  add(resource: IResource): void {
    this.resources.push(resource);
    if (!this.currentResource) {
      this.setCurrentResource(0);
    }
  }

  getSelectedResources(): IResource [] {
    this.resources.forEach(element => {
      const selectedItems = [];
      if(!element.itemList) {
        return;
      }
      element.itemList.forEach((item: any) => {
        if (item.isChecked) {
          selectedItems.push(item);
        }
      });
      element.itemList = selectedItems;
    });
    return this.resources;
  }

  hasNext(): boolean {
    return this.currentResourceIndex !== this.resources.length - 1;
  }

  getNext(): any {
    if (this.currentResourceIndex >= this.resources.length) {
      return;
    }
    this.currentResourceIndex++;
    this.setCurrentResource(this.currentResourceIndex);
    return this.currentResource;
  }

  getNextName(): string {
    if (this.currentResourceIndex >= this.resources.length) {
      return '';
    }
    return this.resources[this.currentResourceIndex + 1].displayName;
  }

  hasPreviouse(): boolean {
    return this.currentResourceIndex !== 0;
  }

  getPreviouse(): any {
    if (this.currentResourceIndex <= 0) {
      return;
    }
    this.currentResourceIndex--;
    this.setCurrentResource(this.currentResourceIndex);
    return this.currentResource;
  }

  getPreviouseName(): string {
    if (this.currentResourceIndex <= 0) {
      return '' ;
    }
    return this.resources[this.currentResourceIndex - 1].displayName;
  }

  setNextUrl(next: string): void {
    this.currentResource.next = next;
  }

  hasMore(): boolean {
    if (this.currentResource.next
      && this.currentResource.next.length) {
        return true;
      } else {
        return false;
      }
  }

  addToList(dataList: any[], append?: boolean): void {
    if (append) {
      const removedDublicates: any[] = dataList;
      this.currentResource.result.forEach((e: any) => {
        dataList.forEach((item: any, index) => {
          if (item.name.toLowerCase() === e.name.toLowerCase()) {
            removedDublicates.splice(index, 1);
          }
        });
      });
      this.currentResource.result = this.currentResource.result.concat(removedDublicates);
    } else {
      this.currentResource.result = dataList;
    }
  }

  reset(): void {
    this.currentResource = null;
    this.currentResourceIndex = 0;
    this.resources = [];
  }
}



