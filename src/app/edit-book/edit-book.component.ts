import { Component, OnInit } from '@angular/core';
import { BookService } from '../_services';
import {Router} from "@angular/router";
import { Books } from '../_models';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  submitted = false;
  user: Books;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private location: Location,
              private bookService: BookService) { }


  ngOnInit() {
    let bookId = localStorage.getItem("editBookId");
    if(!bookId) {
      alert("Debe iniciar sesión.")
      this.router.navigate(['booklist']);
      return;
    }
    this.editForm = this.formBuilder.group({
      autor: ['', Validators.required],
      nombre: ['', Validators.required],
      resumen: ['', Validators.required],
      edicion: ['', Validators.required]
    });

    this.bookService.getBookById(bookId)
        .pipe(first())
        .subscribe(
            bookItem =>
                this.editForm.setValue(bookItem)
        );
  }

  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    let bookId = localStorage.getItem("editBookId");
    this.bookService.updateBook(bookId,this.editForm.value)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate(['list-user']);
            },
            error => {
              alert(error);
            });
  }

  goBack() {
    this.location.back();
  }


}