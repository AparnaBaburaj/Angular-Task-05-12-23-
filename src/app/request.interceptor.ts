import { HttpInterceptorFn ,HttpHandler, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { error } from 'console';
import { request } from 'express';
import { catchError, tap, throwError } from 'rxjs';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {

  console.log(`Outgoing Request: ${req.method} ${req.url}`);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        console.log(
          `Incoming Response: ${event.status} for ${req.method} ${req.url}`
        );
      }
    })
  );

  const modifiedRequest = req.clone({
    setHeaders: {
      'X-Custom-Header': 'MyCustomHeaderValue',
    },
  });

  return next(modifiedRequest);
  console.log(`Request is on the way to ${req.url}`);
  
  
  const authreq=req.clone({
    headers:req.headers.set('Authorization','Bearer the token'),
  }); 
 // return next (authreq);
 return next(req).pipe(
  catchError((error: HttpErrorResponse) => {
    console.error('HTTP Error Interceptor:', error);
    return throwError(error.message || 'Server error');
  })
  );



  
};
