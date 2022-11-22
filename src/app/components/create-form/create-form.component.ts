import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  firstName: string = '';
  address: string = '';
  creditCard: number | string = '';
  @Output() checkoutSuccess: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.checkoutSuccess.emit(this.firstName);
  }
}
