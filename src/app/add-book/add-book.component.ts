import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from '../_services';
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private location: Location,
                private bookService: BookService) {
    }

    addForm: FormGroup;

    ngOnInit() {

        this.addForm = this.formBuilder.group({
            edicion: ['', Validators.required],
            resumen: ['', Validators.required],
            autor: ['', Validators.required],
            nombre: ['', Validators.required]
        });

    }

    get f() {
        return this.addForm.controls;
    }

    onSubmit() {
        this.bookService.createBook(this.addForm.value)
            .subscribe(data => {
                this.router.navigate(['booklists']);
            });
    }

    goBack() {
        this.location.back();
    }
}