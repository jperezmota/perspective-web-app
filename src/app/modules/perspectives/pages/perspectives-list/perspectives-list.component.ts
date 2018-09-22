import { Component, OnInit, OnDestroy } from '@angular/core';
import { PerspectiveService } from '../../services/perspectives.service';
import { HttpResponse } from '@angular/common/http';
import { PerspectiveModel } from '../../models/perspective.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from '../../../../../../node_modules/rxjs';

@Component({
    selector: 'm-pers-list',
    templateUrl: './perspectives-list.component.html',
    styleUrls: ['./perspectives-list.component.scss']
})
export class PerspectivesListComponent implements OnInit, OnDestroy {

    perspectives: PerspectiveModel[] = [];
    private perspectivesSubscription: Subscription;

    constructor(private perspectiveService: PerspectiveService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.perspectivesSubscription = this.perspectiveService.getPerspectives().subscribe(
            (response: HttpResponse<PerspectiveModel[]>) => {
                this.perspectives = response.body;
            }
        );
    }

    navigateToPerspectiveView(id: number): void {
        this.router.navigate(['perspectives', id]);
    }

    navigateToCreatePerspectivePage() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.perspectivesSubscription.unsubscribe();
    }
}
