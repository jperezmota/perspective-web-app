import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutConfigService } from '../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../core/services/layout/subheader.service';
import * as objectPath from 'object-path';
import { TheySaidSoService } from '../../../perspectives/services/theysaidso.service';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';

@Component({
	selector: 'm-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

	perspectives: any[] = [];

	constructor(private theySaidSoService: TheySaidSoService, private toastr: ToastrService) {}

	ngOnInit(): void {
		this.theySaidSoService.getPerspectiveOfTheDay('life').subscribe(
			(response) => {
				this.perspectives.push(response.body);
			},
			(error) => {
				this.toastr.error('Something went wrong trying to fetch Dashboad Content.', 'Inconvenient');
			}
		);

		this.theySaidSoService.getPerspectiveOfTheDay('inspire').subscribe(
			(response) => {
				this.perspectives.push(response.body);
			},
			(error) => {
				this.toastr.error('Something went wrong trying to fetch Dashboad Content.', 'Inconvenient');
			}
		);

		this.theySaidSoService.getPerspectiveOfTheDay('management').subscribe(
			(response) => {
				this.perspectives.push(response.body);
			},
			(error) => {
				this.toastr.error('Something went wrong trying to fetch Dashboad Content.', 'Inconvenient');
			}
		);
	}
}
