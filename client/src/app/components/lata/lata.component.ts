import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lata',
  templateUrl: './lata.component.html',
  styleUrls: ['./lata.component.scss']
})
export class LataComponent implements OnInit {

  @Output()
  eraSelected = new EventEmitter<string>()

  @Input()
  eras!: Array<string> // ! znaczy ze w czasie "kompilacji" wartosc nie jest znana tylko dopiero podczas wykonywania

  @Input()
  selected_era!: string

  constructor() { }


  emitEraSelection(era_name: string): void {
    this.eraSelected.emit(era_name)
  }

  ngOnInit(): void {
  }

}
