import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gazety',
  templateUrl: './gazety.component.html',
  styleUrls: ['./gazety.component.scss']
})
export class GazetyComponent {

  img_base_url: string

  @Input()
  magazines: any

  @Output()
  magazineSelected = new EventEmitter<string>()

  constructor() {
    this.img_base_url = 'http://www.atarionline.pl/biblioteka/czasopisma/img/'
  }

  log(x: any) {
    console.log(x)
    return x
  }

  emitMagazineSelection(magazine_name: string): void {
    this.magazineSelected.emit(magazine_name)
  }

  getImgUrl(img_name: string): string {
    return this.img_base_url + img_name
  }
}
