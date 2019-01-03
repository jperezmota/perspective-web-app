import { Component } from '../../../../../../node_modules/@angular/core';
import { NgbActiveModal } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AuthorsService } from '../../services/authors.service';
import { AuthorModel } from '../../models/author.model';
import { HttpResponse } from '../../../../../../node_modules/@angular/common/http';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'm-pers-category-edition-modal',
    templateUrl: './category-edition-modal.component.html'
})
export class CategoryEditionModalComponent {

    public category: CategoryModel;

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
        this.categoryService.modifyCategory(this.category).subscribe(
            (response: HttpResponse<AuthorModel>) => {
                const authorModified = response.body;
                this.toastr.success('Your Author: ' + authorModified.name + ', has been modified.',
                                    'Congratulations, ' + this.authenticationService.getUsername() + '.');
                this.modal.close(authorModified);
            },
            (error) => {
                this.toastr.error(error, 'Inconvenient');
            }
        );
    }
}
