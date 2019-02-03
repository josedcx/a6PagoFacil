import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {Router} from "@angular/router";
import {Books} from '../_models';
import {BookService} from '../_services';

@Component({templateUrl: 'booklists.component.html'})
export class BooklistsComponent implements OnInit {
    books: Books[] = [];
    constructor(private router: Router, private userService: BookService) { }

    ngOnInit() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(
                bookList =>
                    this.books = bookList
            );
    }

    deleteBook(book: Book): void {
        console.log(book);
        this.userService.deleteBook(book.id)
            .subscribe(data => {
                this.books = this.books.filter(u => u !== book);
            })
    };

    editBook(book: Book): void {
        localStorage.removeItem("editBookId");
        localStorage.setItem("editBookId", book.id.toString());
        this.router.navigate(['edit-book']);
    };

    addBook(): void {
        this.router.navigate(['add-book']);
    };

}