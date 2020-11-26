import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LmsServiceService } from '../lms-service.service';

@Component({
	selector: 'app-check-in-books',
	templateUrl: './check-in-books.component.html',
	styleUrls: ['./check-in-books.component.scss']
})
export class CheckInBooksComponent implements OnInit {
	selectedRecords = [];
	loaded = false;
	showTable = false;
	lastSearchedString: string;
	searchResults;
	searchQueryObj
	searchForm: FormGroup;


	constructor(
		private fb: FormBuilder,
		private router: Router,
		private lmsService: LmsServiceService
	) { }

	/**
	 * On initialization, it calls a function to generate Employee Details Form
	 */
	ngOnInit() {
		this.searchFormBuilder();
	}

	searchFormBuilder() {
		this.searchForm =
			this.fb.group({
				'search': [null,
					Validators.compose([Validators.required])],
			});
	}

	handleSearchQuery(form: any) {
		console.log('form', form.search);
		this.lastSearchedString = form.search;
		this.loadList(this.lastSearchedString)
	}

	loadList(searchString: string) {
		this.lmsService.getCheckedInBooksList(searchString).subscribe((data) => this.handleSearchResults(data));
	}

	handleSearchResults(resultData) {
		this.selectedRecords = [];
		console.log(resultData);
		this.searchResults = resultData['searchResult'];
		this.loaded = true;
		if (this.searchResults && this.searchResults.length > 0) {
			this.showTable = true;
		} else {
			this.showTable = false;
		}
	}

	handleCheckBox(isChecked: boolean, loanId: string) {
		if (isChecked) {
			this.selectedRecords.push(loanId);
		} else {
			this.selectedRecords = this.selectedRecords.filter(record => record !== loanId)
		}
	}

	checkInBooks() {
		this.lmsService.checkInBooksRequest(this.selectedRecords).subscribe((data) => this.loadList(this.lastSearchedString));
	}
}
