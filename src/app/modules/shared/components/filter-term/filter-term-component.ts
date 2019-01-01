import { Component, Input, Output, EventEmitter } from '../../../../../../node_modules/@angular/core';

@Component({
    selector: 'm-pers-filter-term',
    templateUrl: './filter-term.component.html'
})
export class FilterTermComponent {

    searchTerm: string = '';
    @Input() placeHolder: string = 'Introduce your search term.';
    @Output() searchProcessed = new EventEmitter<string>();
    @Output() userLeftInputField = new EventEmitter<string>();

    onSearchClicked() {
        this.searchProcessed.emit(this.searchTerm.trim());
    }

    onInputBlur() {
        this.userLeftInputField.emit(this.searchTerm.trim());
    }
}
