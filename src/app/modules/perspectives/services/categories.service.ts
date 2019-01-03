import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiInfo } from '../../../shared/api-info';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CategoryModel } from '../models/category.model';

@Injectable()
export class CategoriesService {

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

    public getCategories(searchTerm: string = ''): Observable< HttpResponse<CategoryModel[]> > {
        const categoriesUrl = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_CATEGORIES;
        const userToken = this.authenticationService.getUserToken();
        let httpParams = new HttpParams();

		if (searchTerm) {
			httpParams = httpParams.set('searchTerm', searchTerm);
		}

        return this.http.get<CategoryModel[]>(categoriesUrl,
                                               {
                                                   observe: 'response',
                                                   headers: new HttpHeaders().set('Authorization', userToken),
                                                   params: httpParams
                                               }
                                            ).pipe(
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
