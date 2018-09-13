import { Component, OnInit } from '@angular/core';
import { PerspectiveService } from '../../services/perspectives.service';
import { HttpResponse } from '../../../../../../node_modules/@angular/common/http';
import { PerspectiveModel } from '../../models/perspective.model';

@Component({
    selector: 'm-pers-list',
    templateUrl: './perspectives-list.component.html',
    styleUrls: ['./perspectives-list.component.scss']
})
export class PerspectivesListComponent implements OnInit {

    perspectives: PerspectiveModel[] = [];

    constructor(private perspectiveService: PerspectiveService) {}

    ngOnInit(): void {
        this.perspectiveService.getPerspectives().subscribe(
            (response: HttpResponse<PerspectiveModel[]>) => {
                this.perspectives = response.body;
                console.log(this.perspectives);
            }
        );
    }
}
