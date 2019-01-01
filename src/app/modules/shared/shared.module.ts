import { NgModule } from "../../../../node_modules/@angular/core";
import { CommonModule } from "../../../../node_modules/@angular/common";
import { FormsModule } from "../../../../node_modules/@angular/forms";
import { ConfirmationModalComponent } from "./components/confirmation-modal/confirmation-modal.component";
import { MatButtonModule } from "../../../../node_modules/@angular/material";
import { FilterTermComponent } from "./components/filter-term/filter-term-component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule
    ],
    declarations: [
        ConfirmationModalComponent,
        FilterTermComponent
    ],
    exports: [
        ConfirmationModalComponent,
        FilterTermComponent
    ],
    entryComponents: [
        ConfirmationModalComponent
    ]
})
export class SharedModule {
}
