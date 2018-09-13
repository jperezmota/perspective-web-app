import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "../../../../../node_modules/@angular/common/http";
import { ApiInfo } from "../../../shared/api-info";
import { PerspectiveModel } from "../models/perspective.model";
import { catchError } from "../../../../../node_modules/rxjs/operators";
import { throwError, Observable } from "../../../../../node_modules/rxjs";
import { Injectable } from "../../../../../node_modules/@angular/core";


@Injectable()
export class PerspectiveService {

    constructor (private http: HttpClient) {}

    public getPerspectives(): Observable< HttpResponse<PerspectiveModel[]> > {
        const perspectiveApiUrl = ApiInfo.API_URL + ApiInfo.API_ENDPOINT_PERSPECTIVE;
        return this.http.get<PerspectiveModel[]>(perspectiveApiUrl, {observe: 'response', headers: new HttpHeaders().set('Authorization', 'asdasdaWEwe12231344' )})
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    private handleError(errorResponse: HttpErrorResponse) {
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
}
