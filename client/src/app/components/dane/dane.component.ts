import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dane',
  templateUrl: './dane.component.html',
  styleUrls: ['./dane.component.scss']
})
export class DaneComponent implements OnInit {


  @Input()
  magazine_title!: string;

  @Input()
  data!: Array<Object>;

  constructor() {

  }

  getCoverImgUrl(img_name: string) {
    return 'http://atarionline.pl/biblioteka/czasopisma/' + this.magazine_title + '/' + img_name
  }

  getFileUrl(file_name: string) {
    return 'http://atarionline.pl/biblioteka/czasopisma/' + this.magazine_title + '/' + file_name
  }

  pureDetails(obj: Object) {
    let new_obj = {}
    for (let [key, value] of Object.entries(obj)) {
      if (key != '$' && key != 'miniaturka') {
        (new_obj as any)[key] = value
      }

    }
    return new_obj
  }

  ngOnInit(): void {
  }

}
