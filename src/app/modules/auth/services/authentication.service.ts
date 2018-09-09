import { BehaviorSubject, Observable, Subject, from, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from 'ngx-auth';

import { TokenStorage } from '../../../core/auth/token-storage.service';
import { UtilsService } from '../../../core/services/utils.service';
import { AccessData } from '../../../core/auth/access-data';
import { CredentialModel } from '../models/credential.model';
import { UserAuthenticationModel } from '../models/user-authentication.model';

import { ApiInfo } from '../../../shared/api-info';

@Injectable()
export class AuthenticationService implements AuthService {

	public onCredentialUpdated$: Subject<AccessData>;

	API_ENDPOINT_REFRESH: string = ';';
	API_URL: string = ';';
	API_ENDPOINT_LOGIN: string = ';';
	API_ENDPOINT_REGISTER: string = 'ada';

	private authenticatedUser: UserAuthenticationModel;

	constructor(
		private http: HttpClient,
		private tokenStorage: TokenStorage,
		private util: UtilsService
	) {
		this.onCredentialUpdated$ = new Subject();
	}

	public login(credential: CredentialModel): Observable<any> {
		const loginApiUrl: string = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_LOGIN;
		return this.http.post<UserAuthenticationModel>(loginApiUrl, credential, {observe: 'response'})
						.pipe(map(
							      (resp: HttpResponse<UserAuthenticationModel>) => {
									  this.authenticatedUser = resp.body;
									  return resp;
							      }
							 ),
							 catchError(this.handleErrorr)
						);
	}

	public userAuthenticated(): boolean {
		return this.authenticatedUser ? true : false;
	}

	public logout(refresh?: boolean): void {
		this.authenticatedUser = null;
		location.reload(true);
	}

	public getUsername(): string {
		return this.authenticatedUser.username;
	}

	private handleErrorr(errorResponse: HttpErrorResponse) {

		const clientSideOrNetworkError = errorResponse.error instanceof ErrorEvent;
		if (clientSideOrNetworkError) {
		  console.error('An error occurred:', errorResponse.error.message);
		} else {
			if (errorResponse.status === 404) {
				return throwError(errorResponse.error.message);
			} else {
				console.error( `Backend returned code ${errorResponse.status}, ` + `body was: ${errorResponse.error}`);
			}
		}

		return throwError('Something bad happened; please try again later.');
	  }

	/**
	 * Check, if user already authorized.
	 * @description Should return Observable with true or false values
	 * @returns {Observable<boolean>}
	 * @memberOf AuthService
	 */
	public isAuthorized(): Observable<boolean> {
		return this.tokenStorage.getAccessToken().pipe(map(token => !!token));
	}

	/**
	 * Get access token
	 * @description Should return access token in Observable from e.g. localStorage
	 * @returns {Observable<string>}
	 */
	public getAccessToken(): Observable<string> {
		return this.tokenStorage.getAccessToken();
	}

	/**
	 * Get user roles
	 * @returns {Observable<any>}
	 */
	public getUserRoles(): Observable<any> {
		return this.tokenStorage.getUserRoles();
	}

	/**
	 * Function, that should perform refresh token verifyTokenRequest
	 * @description Should be successfully completed so interceptor
	 * can execute pending requests or retry original one
	 * @returns {Observable<any>}
	 */
	public refreshToken(): Observable<AccessData> {
		return this.tokenStorage.getRefreshToken().pipe(
			switchMap((refreshToken: string) => {
				return this.http.get<AccessData>(this.API_URL + this.API_ENDPOINT_REFRESH + '?' + this.util.urlParam(refreshToken));
			}),
			tap(this.saveAccessData.bind(this)),
			catchError(err => {
				this.logout();
				return throwError(err);
			})
		);
	}

	/**
	 * Function, checks response of failed request to determine,
	 * whether token be refreshed or not.
	 * @description Essentialy checks status
	 * @param {Response} response
	 * @returns {boolean}
	 */
	public refreshShouldHappen(response: HttpErrorResponse): boolean {
		return response.status === 401;
	}

	/**
	 * Verify that outgoing request is refresh-token,
	 * so interceptor won't intercept this request
	 * @param {string} url
	 * @returns {boolean}
	 */
	public verifyTokenRequest(url: string): boolean {
		return url.endsWith(this.API_ENDPOINT_REFRESH);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return from(result);
		};
	}

	/**
	 * Save access data in the storage
	 * @private
	 * @param {AccessData} data
	 */
	private saveAccessData(accessData: AccessData) {
		if (typeof accessData !== 'undefined') {
			this.tokenStorage
				.setAccessToken(accessData.accessToken)
				.setRefreshToken(accessData.refreshToken)
				.setUserRoles(accessData.roles);
			this.onCredentialUpdated$.next(accessData);
		}
	}

	/**
	 * Submit registration request
	 * @param {Credential} credential
	 * @returns {Observable<any>}
	 */
	public register(credential: CredentialModel): Observable<any> {
		// dummy token creation
		credential = Object.assign({}, credential, {
			accessToken: 'access-token-' + Math.random(),
			refreshToken: 'access-token-' + Math.random(),
			roles: ['USER'],
		});
		return this.http.post(this.API_URL + this.API_ENDPOINT_REGISTER, credential)
			.pipe(catchError(this.handleError('register', []))
		);
	}

	/**
	 * Submit forgot password request
	 * @param {Credential} credential
	 * @returns {Observable<any>}
	 */
	public requestPassword(credential: CredentialModel): Observable<any> {
		return this.http.get(this.API_URL + this.API_ENDPOINT_LOGIN + '?' + this.util.urlParam(credential))
			.pipe(catchError(this.handleError('forgot-password', []))
		);
	}

}
