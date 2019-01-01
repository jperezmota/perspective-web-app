import { OnInit, OnDestroy, Component } from '../../../../../../node_modules/@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { AuthorModel } from '../../models/author.model';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { HttpResponse } from '../../../../../../node_modules/@angular/common/http';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';

@Component({
    selector: 'm-pers-authors-list',
    templateUrl: './authors-list.component.html'
})
export class AuthorsListComponent implements OnInit, OnDestroy {

    authors: AuthorModel[] = [];
    private authorsSubscription: Subscription;

    constructor(private authorsService: AuthorsService, private toastr: ToastrService) {}

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
                const resultFound = this.authors.length > 0;
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
}
