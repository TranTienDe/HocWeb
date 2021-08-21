import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss', '../modal-shared.component.scss']
})
export class SuccessModalComponent implements OnInit {
  @Input() public modalHeaderText: string | undefined;
  @Input() public modalBodyText: string | undefined;
  @Input() public okButtonText: string | undefined;
  @Output() public redirectOnOK = new EventEmitter();

  constructor() {
  }

  public ngOnInit(): void {
  }

  public emitEvent = () => {
    this.redirectOnOK.emit();
  }

}
