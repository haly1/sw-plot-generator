import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourcesSelectorComponent } from './resourcesSelector.component';
import { FormsModule } from '@angular/forms';
import { ResourcesListComponent } from './resourcesList.component';
import { PlotGeneratorComponent } from './plotGenerator.component';

@NgModule({
  declarations: [
    AppComponent,
    ResourcesSelectorComponent,
    ResourcesListComponent,
    PlotGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
