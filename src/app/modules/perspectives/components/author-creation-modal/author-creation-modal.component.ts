import { Component } from '../../../../../../node_modules/@angular/core';
import { NgbActiveModal } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AuthorsService } from '../../services/authors.service';
import { AuthorModel } from '../../models/author.model';
import { HttpResponse } from '../../../../../../node_modules/@angular/common/http';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
    selector: 'm-pers-author-creation-modal',
    templateUrl: './author-creation-modal.component.html'
})
export class AuthorCreationModalComponent {

    public author: any = {};

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
        this.authorService.createAuthor(this.author).subscribe(
            (response: HttpResponse<AuthorModel>) => {
                const authorCreated = response.body;
                this.toastr.success('Your Author: ' + authorCreated.name + ', has been created.',
                                    'Congratulations, ' + this.authenticationService.getUsername() + '.');
                this.modal.close(authorCreated);
            },
            (error) => {
                this.toastr.error(error, 'Inconvenient');
            }
        );
    }
}
