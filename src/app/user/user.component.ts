import { Component, OnInit, ViewChild  } from '@angular/core';
import { CurdserviceService } from '../curdservice.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
      { field: 'id', sortable: true, filter: true, checkboxSelection: true},
      { field: 'name', sortable: true, filter: true },
      { field: 'age', sortable: true, filter: true },
      { field: 'department', sortable: true, filter: true },
      { field: 'designation', sortable: true, filter: true },
      { field: 'projects', sortable: true, filter: true },
      { field: 'reporting', sortable: true, filter: true },
      { field: 'action', cellRenderer: function(params) {
        console.log(params.data.id, 'dssfd');
        const actionDiv = document.createElement('div');
        actionDiv.innerHTML = '<span mat-icon-button color="primary" (click)="read('+params.data.id+', content, Edit)"><i class="material-icons">create</i></span>';
        actionDiv.innerHTML +='<span mat-icon-button color="primary" (click)="delete('+params.data.id+')"><i class="material-icons">delete</i></span>';
        return actionDiv.innerHTML;
      }}
  ];

  rowData :any;

  constructor(private curdserv:CurdserviceService) {
  }

  ngOnInit(): void {
    this.curdserv.getData().subscribe(result => {
      console.log(result, 'chck');
      this.rowData = result;
    });
  }

  read(id, content, Edit) {
    alert(id);
  }

}