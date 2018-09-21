import { Component } from '../../../../../../node_modules/@angular/core';
import { NgbActiveModal } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'm-pers-confirmation-modal',
    templateUrl: './confirmation-modal.component.html'
})
export class ConfirmationModalComponent {
    closeResult: string;
    message: string = 'Are you sure you want to proceed with this action?';
    confirmationButtonMessage: string = 'Yes';

    constructor(public modal: NgbActiveModal) {}

    dismiss() {
        this.modal.dismiss('Cross click');
    }

    confirm() {
        this.modal.close(true);
    }

    cancel() {
        this.modal.close(false);
    }

}
