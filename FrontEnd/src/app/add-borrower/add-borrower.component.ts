import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LmsServiceService } from '../lms-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-add-borrower',
	templateUrl: './add-borrower.component.html',
	styleUrls: ['./add-borrower.component.scss']
})
export class AddBorrowerComponent implements OnInit {
	addBorrowersForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private lmsService: LmsServiceService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.generateBorrowersForm();
	}

	generateBorrowersForm() {
		this.addBorrowersForm =
			this.fb.group({
				'name': [null,
					Validators.compose([Validators.required,
					Validators.pattern('^[a-zA-Z ]{1,30}$')])],

				'ssn': [null,
					Validators.compose([Validators.required,
					Validators.minLength(9),
					Validators.maxLength(9),
					Validators.pattern('^[0-9]*$')])],
				'address': [null,
					Validators.compose([Validators.required,
					])],
				'phone': [null,
					Validators.compose([
						Validators.minLength(10),
						Validators.maxLength(10),
						Validators.pattern('^[0-9]*$')
					])],

			});
	}

	saveBorrowers(form: any) {
		this.lmsService.addBorrower(form.ssn, form.name, form.address, form.phone).subscribe((data) => this.showAlert(data));
	}

	showAlert(data) {
		if(data.success) {
			this.toastrService.success(data.message, 'Success');
		} else {
			this.toastrService.error(data.message, 'Error');
		}
	}

}
