import { NgModule } from "../../../../node_modules/@angular/core";
import { CommonModule } from "../../../../node_modules/@angular/common";
import { FormsModule } from "../../../../node_modules/@angular/forms";
import { ConfirmationModalComponent } from "./components/confirmation-modal/confirmation-modal.component";
import { MatButtonModule } from "../../../../node_modules/@angular/material";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule
    ],
    declarations: [
        ConfirmationModalComponent
    ],
    exports: [
        ConfirmationModalComponent
    ],
    entryComponents: [
        ConfirmationModalComponent
    ]
})
export class SharedModule {
}
