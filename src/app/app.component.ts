import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GuidService } from './services/guid.service';
import { DataCacheService } from './services/data-cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sandgate Treasure Hunt';

  cookieValue = 'UNKNOWN';

  constructor( private srvCookie: CookieService,
    private srvGuid: GuidService,
    private srvDataCache: DataCacheService ) { }
 
  ngOnInit(): void {

    if(!this.srvCookie.check('UserId')) {
      const gUserId = this.srvGuid.newGuidAsString();
      this.srvCookie.set( 'UserId', gUserId, 999 );
    }

    this.srvDataCache.userId = this.srvCookie.get('UserId');
  }
}
