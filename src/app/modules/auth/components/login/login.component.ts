import {
	Component,
	OnInit,
	Output,
	Input,
	ViewChild,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthNoticeService } from '../../../../core/auth/auth-notice.service';
import { NgForm } from '@angular/forms';
import * as objectPath from 'object-path';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerButtonOptions } from '../../../partials/content/general/spinner-button/button-options.interface';
import { CredentialModel } from '../../models/credential.model';
import { UserAuthenticationModel } from '../../models/user-authentication.model';
import { HttpResponse } from '@angular/common/http';

@Component({
	selector: 'm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

	@Input() action: string;
	@Output() actionChange = new Subject<string>();
	public model: CredentialModel = { username: 'admin', password: 'admin' };

	@ViewChild('f') form: NgForm;
	errors: any = [];

	constructor(
		private authService: AuthenticationService,
		private router: Router,
		public authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.showDemoMessage();
	}

	showDemoMessage(): void {
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Use account
			<strong>admin</strong> and password
			<strong>admin</strong> to continue.`;
			this.authNoticeService.setNotice(initialNotice, 'success');
		}
	}

	submit() {
		this.authService.login(this.model).subscribe(
			(resp: HttpResponse<UserAuthenticationModel>) => {
				this.router.navigate(['/']);
			},
			error => this.authNoticeService.setNotice(error, 'error')
		);
	}

	forgotPasswordPage(event: Event) {
		this.action = 'forgot-password';
		this.actionChange.next(this.action);
	}

	register(event: Event) {
		this.action = 'register';
		this.actionChange.next(this.action);
	}

	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
	}

}
