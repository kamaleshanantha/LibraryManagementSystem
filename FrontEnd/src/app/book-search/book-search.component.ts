import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LmsServiceService } from '../lms-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-book-search',
	templateUrl: './book-search.component.html',
	styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
	showTable = false;
	loaded = false;
	currentlySelectedIsbn: string;
	lastSearchedString: string;
	searchResults;
	searchQueryObj
	searchForm: FormGroup;
	checkoutForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private lmsService: LmsServiceService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.searchFormBuilder();
		this.checkoutFormBuilder();
	}

	searchFormBuilder() {
		this.searchForm =
			this.fb.group({
				'search': [null,
					Validators.compose([Validators.required])],
			});
	}

	checkoutFormBuilder() {
		this.checkoutForm =
			this.fb.group({
				'checkout': [null,
					Validators.compose([Validators.required])],
			});
	}

	handleSearchQuery(form: any) {
		console.log('form', form.search);
		this.lastSearchedString = form.search;
		this.loadList(this.lastSearchedString)
	}

	loadList(searchString: string) {
		this.lmsService.getBookAvailablityList(searchString).subscribe((data) => this.handleSearchResults(data));
	}

	handleSearchResults(resultData) {
		console.log(resultData);
		this.searchResults = resultData['searchResult'];
		this.loaded = true;
		if (this.searchResults && this.searchResults.length > 0) {
			this.showTable = true;
		} else {
			this.showTable = false;
		}
	}

	handleCheckoutForm(form) {
		console.log('form', form.checkout);
		if (!this.currentlySelectedIsbn) {
			this.toastrService.error('Please select any book', 'Error');
		} else {
			const checkOutBookParams = {
				cardId: form.checkout,
				isbn: this.currentlySelectedIsbn
			}
			this.lmsService.post(checkOutBookParams).subscribe((data) => this.handleCheckoutResponse(data));
		}
	}

	handleCheckoutResponse(data) {
		if (data.success) {
			this.currentlySelectedIsbn = null;
			this.loadList(this.lastSearchedString);
			this.toastrService.success(data.message, 'Success');
		} else {
			this.toastrService.error(data.message, 'Error');
		}
	}

	radioButtonChanged(event) {
		console.log('event', event);
		this.currentlySelectedIsbn = event.target.value;
	}
}
