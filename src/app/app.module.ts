import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule}    from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent}  from './app.component';
import {routing}        from './app.routing';

import {JwtInterceptor, ErrorInterceptor} from './_helpers';
import {BooklistsComponent} from './booklists';
import {LoginComponent} from './login';
import {TokenInterceptorService} from './token-interceptor.service';
import {AddBookComponent} from './add-book/add-book.component';
import {EditBookComponent} from './edit-book/edit-book.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        BooklistsComponent,
        LoginComponent,
        AddBookComponent,
        EditBookComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}