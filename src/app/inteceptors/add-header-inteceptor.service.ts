import { Injectable, ErrorHandler } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataCacheService } from '../services/data-cache.service';

@Injectable({
  providedIn: 'root'
})
export class AddHeaderInteceptorService implements HttpInterceptor {

  constructor(private srvDataCache: DataCacheService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     // Clone the request to add the new header.
    const authReq = request.clone({
      headers: request.headers.set('TreasureHuntUserID', this.srvDataCache.userId)
    });

    return next.handle(authReq);

    ErrorHandler

  }
}
