import { Routes, RouterModule } from '@angular/router';

import { BooklistsComponent } from './booklists';
import { LoginComponent } from './login';
import {AddBookComponent} from "./add-book/add-book.component";
import {EditBookComponent} from "./edit-book/edit-book.component";
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: BooklistsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'edit-book', component: EditBookComponent },
    // otherwise redirect to bookLists
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);