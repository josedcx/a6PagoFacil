import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Books} from '../_models';

@Injectable({providedIn: 'root'})
export class BookService {
    constructor(private http: HttpClient) {   }
    baseUrl: string = 'https://d7ka3nqya8.execute-api.us-east-2.amazonaws.com/dev/';

    getAll() {
        return this.http.get<any>(this.baseUrl + 'getAll')
            .pipe(map(bookList => {
                if (bookList) {
                    return bookList.libros;
                }
                else {
                    return 'mensaje de error'
                }

            }))
    }

    getBookById(bookId) {
        return this.http.get<any>(this.baseUrl + 'get/' + bookId)
            .pipe(map(bookItem => {
                if (bookItem) {
                    return bookItem.libro;
                }
                else {
                    return 'mensaje de error'
                }
            }))

    }

    createBook(book: Book) {
        return this.http.post<any>(this.baseUrl + 'create', book)
            .pipe(map(res => {
            }));
    }

    updateBook(bookId, book: Book) {
        return this.http.put(this.baseUrl + 'update/' + bookId, book);
    }

    deleteBook(id: number) {
        return this.http.delete(this.baseUrl + 'delete/' + id);
    }

    getToken() {
        return localStorage.getItem('currentUser')
    }
}