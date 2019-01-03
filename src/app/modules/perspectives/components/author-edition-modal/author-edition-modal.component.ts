import { Component } from '../../../../../../node_modules/@angular/core';
import { NgbActiveModal } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AuthorsService } from '../../services/authors.service';
import { AuthorModel } from '../../models/author.model';
import { HttpResponse } from '../../../../../../node_modules/@angular/common/http';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
    selector: 'm-pers-author-edition-modal',
    templateUrl: './author-edition-modal.component.html'
})
export class AuthorEditionModalComponent {

    public author: AuthorModel;

    constructor(public modal: NgbActiveModal,
                private authorService: AuthorsService,
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
        this.authorService.modifyAuthor(this.author).subscribe(
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
