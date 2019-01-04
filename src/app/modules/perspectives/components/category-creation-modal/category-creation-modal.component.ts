import { Component } from '../../../../../../node_modules/@angular/core';
import { NgbActiveModal } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AuthorsService } from '../../services/authors.service';
import { AuthorModel } from '../../models/author.model';
import { HttpResponse } from '../../../../../../node_modules/@angular/common/http';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'm-pers-category-creation-modal',
    templateUrl: './category-creation-modal.component.html'
})
export class CategoryCreationModalComponent {

    public category: any = {};

    constructor(public modal: NgbActiveModal,
                private categoryService: CategoriesService,
                private toastr: ToastrService,
                private authenticationService: AuthenticationService) {

    }

    public dismiss(): void {
        this.modal.dismiss('Cross click');
    }

    public cancel(): void {
        this.modal.close(false);
    }

    public processingForm(): void {
        this.categoryService.createCategory(this.category).subscribe(
            (response: HttpResponse<AuthorModel>) => {
                const authorCreated = response.body;
                this.toastr.success('Your Category: ' + authorCreated.name + ', has been created.',
                                    'Congratulations, ' + this.authenticationService.getUsername() + '.');
                this.modal.close(authorCreated);
            },
            (error) => {
                this.toastr.error(error, 'Inconvenient');
            }
        );
    }
}
