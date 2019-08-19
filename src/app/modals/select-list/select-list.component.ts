import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit {
    boxName: string;
    boxItems: any;
    selectedIndex: number;

    constructor(
        private modalParams: ModalDialogParams,
    ) { }

    ngOnInit() {
        this.boxName = `Select ${this.modalParams.context.boxName}`;
        this.boxItems = this.modalParams.context.boxItems;
        this.selectedIndex = this.modalParams.context.selectedIndex;
    }

    onSelectItem(selectedIndex) {
        this.closeModal(selectedIndex)
    }

    closeModal(closeModalValue?) {
        this.modalParams.closeCallback(closeModalValue);
    }

}
