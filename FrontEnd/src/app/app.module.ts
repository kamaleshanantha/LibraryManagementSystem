import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { LmsServiceService } from './lms-service.service';
import { Routes, RouterModule } from '@angular/router';
import { CheckInBooksComponent } from './check-in-books/check-in-books.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddBorrowerComponent } from './add-borrower/add-borrower.component';
import { FinesComponent } from './fines/fines.component';

const routes: Routes = [
  { path: 'booksearch', component: BookSearchComponent },
  { path: 'checkinbooks', component: CheckInBooksComponent },
  { path: 'addborrower', component: AddBorrowerComponent },
  { path: 'fines', component: FinesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BookSearchComponent,
    CheckInBooksComponent,
    AddBorrowerComponent,
    FinesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      timeOut: 1500}),
    NgxPaginationModule
  ],
  providers: [LmsServiceService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
