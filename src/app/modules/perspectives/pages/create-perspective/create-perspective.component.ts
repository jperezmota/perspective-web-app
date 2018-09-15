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

@Component({
    selector: 'm-pers-perspective',
    templateUrl: './create-perspective.component.html',
    styleUrls: ['./create-perspective.component.scss']
})
export class CreatePerspectiveComponent implements OnInit, OnDestroy {

    perspective: any = {};
    authors: AuthorModel[] = [];
    categories: CategoryModel[] = [];

    errorMessage: String = '';

    private authorsSubscription: Subscription;
    private categoriesSubscription: Subscription;

   constructor(private router: Router,
               private authorsService: AuthorsService,
               private categoriesService: CategoriesService,
               private perspectiveService: PerspectiveService) {}

   ngOnInit() {
        this.authorsSubscription = this.authorsService.getAuthors().subscribe(
            (response: HttpResponse<AuthorModel[]>) => {
                this.authors = response.body;
            },
            error => {
                this.errorMessage += 'Something went wrong trying to fetch the authors. <br>';
            }
        );

        this.categoriesSubscription = this.categoriesService.getCategories().subscribe(
            (response: HttpResponse<CategoryModel[]>) => {
                this.categories = response.body;
            },
            error => {
                this.errorMessage += 'Something went wrong trying to fetch the categories. <br>';
            }
        );
   }

   processingForm() {
       this.perspectiveService.createPerspective(this.perspective).subscribe(
           (response: HttpResponse<PerspectiveModel>) => {
               this.router.navigate(['perspectives']);
           },
           error => {
               this.errorMessage += error + '<br>';
           }
       );
   }

   ngOnDestroy() {
       this.authorsSubscription.unsubscribe();
       this.categoriesSubscription.unsubscribe();
   }

}
