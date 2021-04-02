import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor() { }

  @Input() title: string
  @Input() confirmText: string
  @Input() btnConfirmText: string
  @Input() btnCancelText: string
  @Output() isConfirm = new EventEmitter<boolean>()

  isOpen: boolean = false;

  ngOnInit(): void {
  }

  confirm() {
    this.isConfirm.emit(true)
    this.isOpen = false;
  }

}
