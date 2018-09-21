import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorsService } from '../../services/authors.service';
import { HttpResponse } from '@angular/common/http';
import { AuthorModel } from '../../models/author.model';
import { CategoriesService } from '../../services/categories.service';
import { CategoryModel } from '../../models/category.model';
import { PerspectiveService } from '../../services/perspectives.service';
import { PerspectiveModel } from '../../models/perspective.model';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
    selector: 'm-pers-create-perspective',
    templateUrl: './create-perspective.component.html',
    styleUrls: ['./create-perspective.component.scss']
})
export class CreatePerspectiveComponent implements OnInit, OnDestroy {

    perspective: any = {};
    authors: AuthorModel[] = [];
    categories: CategoryModel[] = [];

    private authorsSubscription: Subscription;
    private categoriesSubscription: Subscription;

    constructor(private router: Router,
        private authorsService: AuthorsService,
        private categoriesService: CategoriesService,
        private perspectiveService: PerspectiveService,
        private toastr: ToastrService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authorsSubscription = this.authorsService.getAuthors().subscribe(
            (response: HttpResponse<AuthorModel[]>) => {
                this.authors = response.body;
            },
            error => {
                this.toastr.error('Something went wrong trying to fetch the Authors.', 'Inconvenient');
            }
        );

        this.categoriesSubscription = this.categoriesService.getCategories().subscribe(
            (response: HttpResponse<CategoryModel[]>) => {
                this.categories = response.body;
            },
            error => {
                this.toastr.error('Something went wrong trying to fetch the Categories.', 'Inconvenient');
            }
        );
    }

    processingForm() {
        this.perspectiveService.createPerspective(this.perspective).subscribe(
            (response: HttpResponse<PerspectiveModel>) => {
                this.toastr.success('Your Perspective has been created.', 'Congratulation, ' + this.authenticationService.getUsername() + '.');
                this.router.navigate(['perspectives', response.body.id]);
            },
            error => {
                this.toastr.error(error, 'Inconvenient');
            }
        );
    }

    ngOnDestroy() {
        this.authorsSubscription.unsubscribe();
        this.categoriesSubscription.unsubscribe();
    }

}
