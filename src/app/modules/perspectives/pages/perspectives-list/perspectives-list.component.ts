import { Component, OnInit, OnDestroy } from '@angular/core';
import { PerspectiveService } from '../../services/perspectives.service';
import { HttpResponse } from '@angular/common/http';
import { PerspectiveModel } from '../../models/perspective.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
    selector: 'm-pers-list',
    templateUrl: './perspectives-list.component.html',
    styleUrls: ['./perspectives-list.component.scss']
})
export class PerspectivesListComponent implements OnInit, OnDestroy {

    public perspectives: PerspectiveModel[] = [];
    public userLogged: string;
    public userHasPerspectiveRegistered: boolean = false;
    public filterFoundResult: boolean = false;
    private perspectivesSubscription: Subscription;

    constructor(private perspectiveService: PerspectiveService,
                private authenticationService: AuthenticationService,
                private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.userLogged = this.authenticationService.getUsername();
        this.perspectivesSubscription = this.perspectiveService.getPerspectives().subscribe(
            (response: HttpResponse<PerspectiveModel[]>) => {
                this.perspectives = response.body;
                if (this.perspectives.length) {
                    this.userHasPerspectiveRegistered = true;
                }
            }
        );
    }

    public ngOnDestroy(): void {
        this.perspectivesSubscription.unsubscribe();
    }

    public navigateToPerspectiveView(id: number): void {
        this.router.navigate(['perspectives', id]);
    }

    public navigateToCreatePerspectivePage() {
        this.router.navigate(['create'], { relativeTo: this.route });
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
        this.perspectivesSubscription = this.perspectiveService.getPerspectives(searchTerm).subscribe(
            (response: HttpResponse<PerspectiveModel[]>) => {
                this.perspectives = response.body;
                const resultFound = this.perspectives.length > 0;
                if (!resultFound) {
                    this.filterFoundResult = true;
                }
            }
        );
    }

    private removeFilterResult(): void {
        this.filterFoundResult = false;
        this.perspectivesSubscription = this.perspectiveService.getPerspectives().subscribe(
            (response: HttpResponse<PerspectiveModel[]>) => {
                this.perspectives = response.body;
            }
        );
    }
}
