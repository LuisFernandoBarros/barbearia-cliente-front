import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let clonedRequest;

    clonedRequest = req.clone({
      headers: req.headers.append('Content-Type', 'application/json; charset=utf-8'),
      withCredentials: true
    });

    return next.handle(clonedRequest).pipe(catchError(err => {
      let error = (err && err.error && err.error.message) || err.statusText;
      if ([401].includes(err.status)) {
        error = { error: { mensagem: "Acesso negado." } };
        return throwError(error);
      }
      return throwError(err);
    }))
  }
}