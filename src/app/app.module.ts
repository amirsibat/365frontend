import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { appRoutes } from './app.routes'

import { GamesService } from './services/games.service'
import { DatePipe } from './pipes/date.pipe'
import { KeysPipe } from './pipes/keys.pipe'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatePipe,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GamesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
