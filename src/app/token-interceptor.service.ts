import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import {BookService} from './_services';
@Injectable()
/* Interceptor de Cabecera para servicio de token*/
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private injector: Injector) {
    }

    intercept(req, next) {
        let authService = this.injector.get(BookService)
        let tokenizedReq = req.clone(
            {
                headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
            }
        )
        return next.handle(tokenizedReq)
    }

}
