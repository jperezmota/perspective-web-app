import { OnInit, OnDestroy, Component } from '../../../../../../node_modules/@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { AuthorModel } from '../../models/author.model';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { HttpResponse } from '../../../../../../node_modules/@angular/common/http';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { NgbModal } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AuthorCreationModalComponent } from '../../components/author-creation-modal/author-creation-modal.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { AuthorEditionModalComponent } from '../../components/author-edition-modal/author-edition-modal.component';

@Component({
    selector: 'm-pers-authors-list',
    styleUrls: ['./authors-list.component.scss'],
    templateUrl: './authors-list.component.html'
})
export class AuthorsListComponent implements OnInit, OnDestroy {

    authors: AuthorModel[] = [];
    private authorsSubscription: Subscription;

    constructor(private authorsService: AuthorsService,
                private authenticationService: AuthenticationService,
                private toastr: ToastrService,
                private modalService: NgbModal) {}

    ngOnInit() {
        this.authorsSubscription = this.authorsService.getAuthors().subscribe(
            (response: HttpResponse<AuthorModel[]>) => {
                this.authors = response.body;
                console.log(JSON.stringify(response.body));
            },
            (error) => {
                this.toastr.error('Something went wrong trying to fetch the Categories.', 'Inconvenient');
            }
        );
    }

    ngOnDestroy() {
        this.authorsSubscription.unsubscribe();
    }

    public openConfirmationModal(author: AuthorModel) {
        const modalRef = this.modalService.open(ConfirmationModalComponent);
        modalRef.componentInstance.message = 'The deletion of your Author: <b>' + author.name + '</b>, will be permanent.';
        modalRef.componentInstance.confirmationButtonMessage = 'Delete Author';
        modalRef.result.then(
            (result) => {
                if (result) {
                    this.deleteAuthor(author);
                }
            },
            (reason) => {

            }
        );
    }

    public editAuthor(author: AuthorModel): void {
        const modalRef = this.modalService.open(AuthorEditionModalComponent);
        modalRef.componentInstance.author = Object.assign({}, author);
        modalRef.result.then(
            (result) => {
                if (result) {
                    this.authors.splice(this.authors.indexOf(author), 1, result);
                }
            },
            (reason) => {

            }
        );
    }

    private deleteAuthor(author: AuthorModel): void {
        this.authorsService.deleteAuthor(author.id).subscribe(
            (response: HttpResponse<any>) => {
                this.toastr.success('Your author has been deleted.', 'Congratulation, ' + this.authenticationService.getUsername() + '.');
                this.authors.splice(this.authors.indexOf(author), 1);
            },
            (error) => {
                this.toastr.error(error, 'Inconvenient');
            }
        );
    }

    public onFilterSearchProcessed(searchTerm: string) {
        if (searchTerm) {
            this.showFilterResult(searchTerm);
        } else {
            this.removeFilterResult();
        }
    }

    public onUserLeftInputField(searchTerm: string) {
        if (!searchTerm) {
            this.removeFilterResult();
        }
    }

    private showFilterResult(searchTerm: string): void {
        this.authorsSubscription = this.authorsService.getAuthors(searchTerm).subscribe(
            (response: HttpResponse<AuthorModel[]>) => {
                this.authors = response.body;
            }
        );
    }

    private removeFilterResult(): void {
        this.authorsSubscription = this.authorsService.getAuthors().subscribe(
            (response: HttpResponse<AuthorModel[]>) => {
                this.authors = response.body;
            }
        );
    }

    public openAuthorCreationWindow(): void {
        const modalRef = this.modalService.open(AuthorCreationModalComponent);
        modalRef.result.then(
            (result) => {
                if (result) {
                    this.authors.push(result);
                }
            },
            (reason) => {

            }
        );

    }
}
