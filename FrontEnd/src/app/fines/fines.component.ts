import { Component, OnInit } from '@angular/core';
import { LmsServiceService } from '../lms-service.service';

@Component({
	selector: 'app-fines',
	templateUrl: './fines.component.html',
	styleUrls: ['./fines.component.scss']
})
export class FinesComponent implements OnInit {

	constructor(
		private lmsService: LmsServiceService
	) { }
	selectedChildRecords = []
	aggregateTableFlag = false
	childTableFlag = false
	aggregateTableAndChildTables = []
	aggregateTable = []
	childTable = []

	ngOnInit() {
		this.loadList();
	}

	loadList() {
		this.aggregateTableFlag = this.childTableFlag = false;
		this.selectedChildRecords = []
		this.lmsService.fetchFines().subscribe((data) => this.showAggregateTable(data));
	}

	showAggregateTable(data) {
		debugger;
		this.aggregateTableAndChildTables = data;
		this.aggregateTable = this.aggregateTableAndChildTables['aggregateTable'];
		if (this.aggregateTable.length > 0) {
			this.aggregateTableFlag = true
		} else {
			this.aggregateTableFlag = false;
		}
	}

	showChildTable(cardId) {
		this.childTableFlag = true;
		this.childTable = this.aggregateTableAndChildTables['childTable'][cardId]
	}

	handleCheckBox(isChecked: boolean, loanId: string) {
		if (isChecked) {
			this.selectedChildRecords.push(loanId);
		} else {
			this.selectedChildRecords = this.selectedChildRecords.filter(record => record !== loanId)
		}
	}

	settleFines() {
		this.lmsService.settleFines(this.selectedChildRecords).subscribe((data) => this.loadList());
	}

}
