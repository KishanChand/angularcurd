import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { CurdserviceService } from '../curdservice.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss']
})
export class UsertableComponent implements OnInit, AfterViewInit  {

  data:any = [];
  editData:any = '';
  isUpdate:boolean = false;
  modalName = '';
  updateId = '';
  closeResult = '';

  displayedColumns: string[] = ['id', 'name', 'age', 'department', 'designation', 'projects', 'reporting', 'action'];
  dataSource : MatTableDataSource  < Element[] >;

  constructor(private curdserv:CurdserviceService, private modalService:NgbModal, private modalConfig:NgbModalConfig) {
    this.curdserv.getData().subscribe(result => {
      this.data = result;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    modalConfig.backdrop = 'static';
  }

  open(content, type) {
    this.modalName = type;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  
  empModalData = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    projects: new FormControl('', Validators.required),
    reporting: new FormControl('', Validators.required)
  });

  get name() { return this.empModalData.get('name') }
  get age() { return this.empModalData.get('age') }
  get department() { return this.empModalData.get('department') }
  get designation() { return this.empModalData.get('designation') }
  get projects() { return this.empModalData.get('projects') }
  get reporting() { return this.empModalData.get('reporting') }

  ngOnInit(): void {
  }

  clearEmp() {
    this.empModalData.reset({});    
  }

  addEmp() {
    this.curdserv.addData(this.empModalData.value).subscribe(result => {
      console.log(result, 'check now');
    });
    this.modalService.dismissAll();
    window.location.reload();
  }

  read(id, modal, type) {
    this.curdserv.readData(id).subscribe(data => {
      this.empModalData = new FormGroup({
        name: new FormControl(data['name'], Validators.required),
        age: new FormControl(data['age'], Validators.required),
        designation: new FormControl(data['designation'], Validators.required),
        department: new FormControl(data['department'], Validators.required),
        projects: new FormControl(data['projects'], Validators.required),
        reporting: new FormControl(data['reporting'], Validators.required)
      });
      this.isUpdate = true;
      this.updateId = data['id'];
      this.modalName = type;
      this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
    });
  }

  updateEmp(id) {
    this.curdserv.updateData(id, this.empModalData.value).subscribe(result => {
      this.modalService.dismissAll();
      window.location.reload();
    })
  }

  delete(id) {
    this.curdserv.deleteData(id).subscribe(result => {
      window.location.reload();
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

}
