import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_APY_KEY = 'MIxt33pSVLLOonIO0sw3IfqATLUWHP3U'
const GIPHY_URL = 'https://api.giphy.com/v1/gifs/'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  gifList: Gif[] = []
  private _tagsHistory: string[] = []

  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private insertTag(tag: string) {
    const tagFormatted = tag.toLowerCase()

    if (this._tagsHistory.includes(tagFormatted)) {

      this._tagsHistory = this._tagsHistory.filter((currentTag) => currentTag !== tagFormatted)
    }

    this._tagsHistory.unshift(tagFormatted)
    this._tagsHistory = this._tagsHistory.splice(0, 10)
    this.saveLocalStorage()
  }

  searchTag(tag: string): void {
    if (!tag) {
      return
    }
    this.insertTag(tag)

    const params = new HttpParams().
      set('api_key', GIPHY_APY_KEY)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${GIPHY_URL}search`, { params })
      .subscribe((resp) => {
        this.gifList = resp?.data
      })
  }

  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    const temporal = localStorage.getItem('history')

    this._tagsHistory = temporal ? JSON.parse(temporal) : []

    if (this._tagsHistory.length < 0) {
      return
    }

    this.searchTag(this._tagsHistory[0])

  }
}
