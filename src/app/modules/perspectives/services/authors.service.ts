import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiInfo } from '../../../shared/api-info';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { AuthorModel } from '../models/author.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthorsService {

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

    public deleteAuthor(authorId: number): Observable< HttpResponse<any> > {
		const authorsURL = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_AUTHORS + '/' + authorId;
		const userToken = this.authenticationService.getUserToken();

		return this.http.delete<any>( authorsURL,
									  {
										  observe: 'response',
									      headers: new HttpHeaders().set('Authorization', userToken )
									  }
									)
									.pipe(
										catchError(this.handleError)
									);
    }

    public getAuthors(searchTerm: string = ''): Observable< HttpResponse<AuthorModel[]> > {
        const authorsURL = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_AUTHORS ;
        const userToken = this.authenticationService.getUserToken();
        let httpParams = new HttpParams();

		if (searchTerm) {
			httpParams = httpParams.set('searchTerm', searchTerm);
        }

        return this.http.get<AuthorModel[]>( authorsURL,
                              {observe: 'response',
                              headers: new HttpHeaders().set('Authorization', userToken),
                              params: httpParams}
                        ).pipe(
                            catchError(this.handleError)
                        );
    }

    public createAuthor(authorModel: AuthorModel): Observable<HttpResponse<AuthorModel> > {
        const perspectiveApiUrl = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_AUTHORS;
        const userToken = this.authenticationService.getUserToken();
        return this.http.post<AuthorModel>(perspectiveApiUrl,
                              authorModel,
                              {
                                observe: 'response',
                                headers: new HttpHeaders().set('Authorization', userToken)
                              }).pipe(
                                  catchError(this.handleError)
                              );
    }

    public modifyAuthor(author: AuthorModel): Observable< HttpResponse<AuthorModel> > {
		const perspectiveApiUrl = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_AUTHORS + '/' + author.id;
		const userToken = this.authenticationService.getUserToken();

		return this.http.patch<AuthorModel>( perspectiveApiUrl,
												  author,
												  {
													  observe: 'response',
													  headers: new HttpHeaders().set('Authorization', userToken )
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
				console.error( `Backend returned code ${errorResponse.status}, ` + `body was: ${errorResponse.error}`);
			}
		}

		return throwError('Something bad happened; please try again later.');
	  }
}
