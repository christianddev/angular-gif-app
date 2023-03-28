import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {

  @Input()
  url!: string

  @Input()
  alt: string = ''

  hasLoaded: boolean = false

  ngOnInit(): void {
    if (!this.url) {
      throw new Error('URL required.');

    }
  }

  onLoad() {
    this.hasLoaded = true
  }

}
