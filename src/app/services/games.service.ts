import { Injectable } from '@angular/core'
import {Http, Response } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class GamesService {
  scores: any

  constructor(public http: Http) {

  }

  getScore() {
    return this.http.get(`http://mobilews.365scores.com/Data/Games/?lang=1&uc=6&tz=15&countries=1`)
                    .map(res => this.scores = res.json())
  }

  getScoreUpdate(lastUpdateId) {
    return this.http.get(`http://mobilews.365scores.com/Data/Games/?lang=1&uc=6&tz=15&countries=1&` + lastUpdateId)
        .map(res => this.scores = res.json())
  }

}