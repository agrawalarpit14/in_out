import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthInterceptor } from './auth/auth-interceptor'
import { ErrorInterceptor } from './error-interceptor'
import { ErrorComponent } from './error/error.component'
import { AngularMaterialModule } from './angular-material.module'
import { IdeasModule } from './ideas/ideas.module'
import { AboutComponent } from './about/about.component'
import { FooterComponent } from './footer/footer.component'
import { BidsComponent } from './bids/bids.component'
import { MatTableDataSource, MatTableModule, MatInputModule } from '@angular/material'
import { OffersComponent } from './offers/offers.component'
import { BountyComponent } from './bounty/bounty.component'
import { BountyCreateComponent } from './bounty-create/bounty-create.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    AboutComponent,
    FooterComponent,
    BidsComponent,
    OffersComponent,
    BountyComponent,
    BountyCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    IdeasModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
