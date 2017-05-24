import {Component, OnInit} from '@angular/core'
import {groupBy} from 'lodash'
import * as moment from 'moment'
import {Observable} from 'rxjs'

import {GamesService} from '../services/games.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css'],
    viewProviders: [GamesService]
})
export class HomeComponent implements OnInit {
    matches: any
    lastUpdateId
    byDay

    constructor(public gamesService: GamesService) {
        setInterval(() => {
            if (!this.lastUpdateId) {
                this.gamesService.getScore().map(data => {
                    this.matches = data
                    this.lastUpdateId = data.LastUpdateID
                    for (let game of data.Games) {
                        game.STime = moment(game.STime, 'DD-MM-YYYY HH:mm')
                    }
                    let byDay = groupBy(data.Games, game => game.STime.format('DD-MM-YYYY'))
                    for (let day in byDay) {
                        if (byDay.hasOwnProperty(day)) {
                            byDay[day] = groupBy(byDay[day], 'Comp')
                        }
                    }
                    return byDay
                }).subscribe(byDay => {
                    this.byDay = byDay
                })
            } else {
                this.gamesService.getScoreUpdate(this.lastUpdateId).map(data => {
                    this.matches = data
                    this.lastUpdateId = data.LastUpdateID
                    for (let game of data.Games) {
                        game.STime = moment(game.STime, 'DD-MM-YYYY HH:mm')
                    }
                    let byDay = groupBy(data.Games, game => game.STime.format('DD-MM-YYYY'))
                    for (let day in byDay) {
                        if (byDay.hasOwnProperty(day)) {
                            byDay[day] = groupBy(byDay[day], 'Comp')
                        }
                    }
                    return byDay
                }).subscribe(byDay => {
                    this.byDay = byDay
                })
            }
        }, 5000)

    }
    ngOnInit() {
        if (!this.lastUpdateId) {
            this.gamesService.getScore().map(data => {
                this.matches = data
                for (let game of data.Games) {
                    game.STime = moment(game.STime, 'DD-MM-YYYY HH:mm')
                }
                let byDay = groupBy(data.Games, game => game.STime.format('DD-MM-YYYY'))
                for (let day in byDay) {
                    if (byDay.hasOwnProperty(day)) {
                        byDay[day] = groupBy(byDay[day], 'Comp')
                    }
                }
                return byDay
            }).subscribe(byDay => {
                this.byDay = byDay
            })
        }


    }
    getCompetitionName(competitionId) {
        for (let competition of this.matches.Competitions) {
            if (competition.ID == competitionId) {
                return competition.Name
            }

        }
    }
    setGameTime(date) { //23-05-2017 21:30
        return date._i.split(' ')[1]
    }
    formatDate(date) {
        let Today = moment(new Date(), 'DD-MM-YYYY')
        let day = moment(date, 'DD-MM-YYYY')
        return day.format('dddd, D MMM') == Today.format('dddd, D MMM') ? 'Today' : day.format('dddd, D MMM')
    }

}
