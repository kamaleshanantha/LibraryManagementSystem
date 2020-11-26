import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class LmsServiceService {
	constructor(private httpClient: HttpClient) { }

	getBookAvailablityList(searchString: string) {
		console.log(searchString);
		return this.httpClient.get(`http://localhost:5000/searchBook?searchString=${searchString}`);
	}

	post(postObj) {
		console.log(postObj);
		return this.httpClient.post('http://localhost:5000/checkoutBook', postObj);
	}

	getCheckedInBooksList(searchString: string) {
		console.log('checkedinBooks', searchString);
		return this.httpClient.get(`http://localhost:5000/searchBookLoan?searchString=${searchString}`);
	}

	checkInBooksRequest(loanIds: Array<number>) {
		const postObj = {
			loanId: loanIds
		}
		return this.httpClient.post('http://localhost:5000/checkinBook', postObj);
	}

	addBorrower(ssn: string, bname: string, address: string, phone: string) {
		const postObj = {
			'ssn': ssn,
			'name': bname,
			'address': address,
			'phone': phone
		}
		return this.httpClient.post('http://localhost:5000/addBorrower', postObj);
	}

	fetchFines() {
		return this.httpClient.get('http://localhost:5000/fetchFines');
	}
	
	settleFines(loanIds: Array<number>) {
		const postObj = {
			loanId: loanIds
		}
		return this.httpClient.post('http://localhost:5000/settleFines', postObj);
	}
}
