import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {

          let errMsg = 'Unkown error:' + err.message;

          // Handle Message according response status
          if ( err.status >= 400 && err.status < 500 ) {
              errMsg = this.getErrorMessageClient(err.status);
          } else {
              errMsg = this.getErrorMessageServer(err.status);
          }

          this.toastrService.error(errMsg);
        }
        return throwError(err);
      })
    );
  }



  getErrorMessageClient(status: number): string {
    switch (status) {
      case 401: return 'Authentication failed!';
      case 403: return 'You don\'t have the permission!';
      case 404: return 'Page not found!';
      default: return 'Ups, didn\'t understand your request. It seems your Fluxcompensator has not enough fuel.';
    }
  }

  getErrorMessageServer(status: number): string {
    return 'Sorry, Server not available! - This time is no booking time!';
  }
}
