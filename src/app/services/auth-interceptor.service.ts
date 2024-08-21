import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Basic ' + btoa('admin:test1234')
        'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password"))
      })
    };
    const modifiedReq = req.clone(httpOptions);
    console.log('Auth Interceptor called ! ');
    return next.handle(modifiedReq);
  }

}