import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { ApiInfo } from '../../../shared/api-info';
import { PerspectiveModel } from '../models/perspective.model';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../auth/services/authentication.service';


@Injectable()
export class PerspectiveService {

    constructor (private http: HttpClient, private authenticationService: AuthenticationService) {}

	public deletePerspective(perspectiveId: number): Observable< HttpResponse<any> > {
		const perspectiveApiUrl = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_PERSPECTIVE + '/' + perspectiveId;
		const userToken = this.authenticationService.getUserToken();

		return this.http.delete<any>( perspectiveApiUrl,
									  {
										  observe: 'response',
									      headers: new HttpHeaders().set('Authorization', userToken )
									  }
									)
									.pipe(
										catchError(this.handleError)
									);
	}

	public getPerspective(perspectiveId: number): Observable< HttpResponse<PerspectiveModel> > {
		const perspectiveApiUrl = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_PERSPECTIVE + '/' + perspectiveId;
		const userToken = this.authenticationService.getUserToken();

		return this.http.get<PerspectiveModel>( perspectiveApiUrl,
											    {
													observe: 'response',
												    headers: new HttpHeaders().set('Authorization', userToken )
											    }
											  )
											  .pipe(
												  catchError(this.handleError)
											  );
	}

	public modifyPerspective(perspective: any): Observable< HttpResponse<PerspectiveModel> > {
		const perspectiveApiUrl = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_PERSPECTIVE + '/' + perspective.id;
		const userToken = this.authenticationService.getUserToken();

		return this.http.patch<PerspectiveModel>( perspectiveApiUrl,
												  perspective,
												  {
													  observe: 'response',
													  headers: new HttpHeaders().set('Authorization', userToken )
												  }
												)
												.pipe(
													catchError(this.handleError)
												);
	}

	public createPerspective(perspective: any): Observable< HttpResponse<PerspectiveModel> > {
		const perspectiveApiUrl = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_PERSPECTIVE;
		const userToken = this.authenticationService.getUserToken();

		return this.http.post<PerspectiveModel>( perspectiveApiUrl,
												 perspective,
												 {
													 observe: 'response',
													 headers: new HttpHeaders().set('Authorization', userToken )
												 }
												)
					    						.pipe(catchError(this.handleError));
	}

    public getPerspectives(searchTerm: string = ''): Observable< HttpResponse<PerspectiveModel[]> > {
		const perspectiveApiUrl = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_PERSPECTIVE;
		const userToken = this.authenticationService.getUserToken();
		let httpParams = new HttpParams();

		if (searchTerm) {
			httpParams = httpParams.set('searchTerm', searchTerm);
		}

		return this.http.get<PerspectiveModel[]>( perspectiveApiUrl,
												  {
													  observe: 'response',
													  headers: new HttpHeaders().set('Authorization', userToken ),
													  params: httpParams
													}
												)
												.pipe(
													catchError(this.handleError)
												);
	}

    private handleError(errorResponse: HttpErrorResponse) {
        const clientSideOrNetworkError = errorResponse.error instanceof ErrorEvent;

		if (clientSideOrNetworkError) {
		  console.error('An error occurred:', errorResponse.error.message);
		} else {
			if (errorResponse.status === 404 || errorResponse.status === 422) {
				return throwError(errorResponse.error.message);
			} else {
				console.error( `Backend returned code ${errorResponse.status}, ` + `body was: ${JSON.stringify(errorResponse.error)}`);
			}
		}

		return throwError('Something bad happened; please try again later.');
	  }
}
