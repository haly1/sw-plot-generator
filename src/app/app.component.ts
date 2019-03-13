import { Component, OnInit } from '@angular/core';
import { ResourcesHttpService } from './resourcesHttp.service';
import { ResourcesManagerService } from './resourcesManager.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
                ResourcesManagerService,
                ResourcesHttpService
              ],
  styleUrls: ['./app.component.css']
})

export class AppComponent {

}
