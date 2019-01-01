import { Component, OnInit, OnDestroy } from '../../../../../../node_modules/@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { HttpResponse } from '../../../../../../node_modules/@angular/common/http';
import { CategoryModel } from '../../models/category.model';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';

@Component({
    selector: 'm-pers-categories-list',
    templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit, OnDestroy {

    private categories: CategoryModel[] = [];
    private categoriesSubscription: Subscription;

    constructor(private categoriesService: CategoriesService,
                private toastr: ToastrService) {}

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
