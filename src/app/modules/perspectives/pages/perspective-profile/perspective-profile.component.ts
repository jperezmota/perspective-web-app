import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthorsService } from "../../services/authors.service";
import { HttpResponse } from "@angular/common/http";
import { AuthorModel } from "../../models/author.model";
import { CategoriesService } from "../../services/categories.service";
import { CategoryModel } from "../../models/category.model";
import { PerspectiveService } from "../../services/perspectives.service";
import { PerspectiveModel } from "../../models/perspective.model";

@Component({
    selector: 'm-pers-perspective',
    templateUrl: './perspective.component.html',
    styleUrls: ['./perspective.component.scss']
})
export class PerspectiveProfileComponent implements OnInit, OnDestroy {

    perspective: any = {};

    perspectiveId: number;
    authors: AuthorModel[] = [];
    categories: CategoryModel[] = [];
    paramsSubscription: Subscription;

   constructor(private router: Router,
               private route: ActivatedRoute,
               private authorsService: AuthorsService,
               private categoriesService: CategoriesService,
               private perspectiveService: PerspectiveService) {}

   ngOnInit() {
        this.perspectiveId = this.route.snapshot.queryParams['id'];

        this.paramsSubscription = this.route.params.subscribe(
            (params: Params) => {
                this.perspectiveId =  params['id'];
            },
            error => {
                console.log(error);
            }
        );

        this.authorsService.getAuthors().subscribe(
            (response: HttpResponse<AuthorModel[]>) => {
                this.authors = response.body;
            },
            error => {
                console.log(error);
            }
        );

        this.categoriesService.getCategories().subscribe(
            (response: HttpResponse<CategoryModel[]>) => {
                this.categories = response.body;
            }
        );
   }

   processingForm() {
       this.perspectiveService.createPerspective(this.perspective).subscribe(
           (response: HttpResponse<PerspectiveModel>) => {
               this.router.navigate(['perspectives']);
           },
           error => {
               console.log(error);
           }
       );
   }

   ngOnDestroy() {
       this.paramsSubscription.unsubscribe();
   }

}
