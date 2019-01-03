import { Component, OnInit, OnDestroy } from '../../../../../../node_modules/@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { HttpResponse } from '../../../../../../node_modules/@angular/common/http';
import { CategoryModel } from '../../models/category.model';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { NgbModal } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { CategoryCreationModalComponent } from '../../components/category-creation-modal/category-creation-modal.component';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CategoryEditionModalComponent } from '../../components/category-edition-modal/category-edition-modal.component';

@Component({
    selector: 'm-pers-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {

    private categories: CategoryModel[] = [];
    private categoriesSubscription: Subscription;

    constructor(private categoriesService: CategoriesService,
                private toastr: ToastrService,
                private modalService: NgbModal,
                private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.categoriesSubscription = this.categoriesService.getCategories().subscribe(
            (response: HttpResponse<CategoryModel[]>) => {
                this.categories = response.body;
            },
            (error) => {
                this.toastr.error('Something went wrong trying to fetch the Categories.', 'Inconvenient');
            }
        );
    }

    ngOnDestroy() {
        this.categoriesSubscription.unsubscribe();
    }

    public editCategory(author: CategoryModel): void {
        const modalRef = this.modalService.open(CategoryEditionModalComponent);
        modalRef.componentInstance.category = Object.assign({}, author);
        modalRef.result.then(
            (result) => {
                if (result) {
                    this.categories.splice(this.categories.indexOf(author), 1, result);
                }
            },
            (reason) => {

            }
        );
    }

    private deleteAuthor(category: CategoryModel): void {
        this.categoriesService.deleteCategory(category.id).subscribe(
            (response: HttpResponse<any>) => {
                this.toastr.success('Your category has been deleted.', 'Congratulation, ' + this.authenticationService.getUsername() + '.');
                this.categories.splice(this.categories.indexOf(category), 1);
            },
            (error) => {
                this.toastr.error(error, 'Inconvenient');
            }
        );
    }

    public openConfirmationModal(category: CategoryModel) {
        const modalRef = this.modalService.open(ConfirmationModalComponent);
        modalRef.componentInstance.message = 'The deletion of your Category: <b>' + category.name + '</b>, will be permanent.';
        modalRef.componentInstance.confirmationButtonMessage = 'Delete Category';
        modalRef.result.then(
            (result) => {
                if (result) {
                    this.deleteAuthor(category);
                }
            },
            (reason) => {

            }
        );
    }

    public openCategoryCreationWindow(): void {
        const modalRef = this.modalService.open(CategoryCreationModalComponent);
        modalRef.result.then(
            (result) => {
                if (result) {
                    this.categories.push(result);
                }
            },
            (reason) => {

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
        this.categoriesSubscription = this.categoriesService.getCategories(searchTerm).subscribe(
            (response: HttpResponse<CategoryModel[]>) => {
                this.categories = response.body;
            }
        );
    }

    private removeFilterResult(): void {
        this.categoriesSubscription = this.categoriesService.getCategories().subscribe(
            (response: HttpResponse<CategoryModel[]>) => {
                this.categories = response.body;
            }
        );
    }

}
