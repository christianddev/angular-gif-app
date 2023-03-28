import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private gifService: GifsService) {
  }

  get gifList() {
    return this.gifService.gifList
  }
}
