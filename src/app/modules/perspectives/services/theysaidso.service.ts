import { HttpClient, HttpHeaders, HttpErrorResponse } from "../../../../../node_modules/@angular/common/http";
import { ApiInfo } from "../../../shared/api-info";
import { AuthenticationService } from "../../auth/services/authentication.service";
import { catchError } from "../../../../../node_modules/rxjs/operators";
import { Injectable } from "../../../../../node_modules/@angular/core";
import { throwError } from "../../../../../node_modules/rxjs";

@Injectable()
export class TheySaidSoService {

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

    getPerspectiveOfTheDay(category: string) {
        const endpointURL = ApiInfo.API_ENDPOINT_THEYSAIDSO_QUOTES + '?category=' + category;

        return this.http.get(endpointURL, {
            observe: 'response'
        }).pipe(
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
				console.error( `Backend returned code ${errorResponse.status}, ` + `body was: ${JSON.stringify(errorResponse.error)}`);
			}
		}

		return throwError('Something bad happened; please try again later.');
	  }
}
