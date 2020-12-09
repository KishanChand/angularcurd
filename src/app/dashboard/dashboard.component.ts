import { Component, OnInit } from '@angular/core';
import { CurdserviceService } from '../curdservice.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data:any = [];
  editData:any = '';
  isUpdate:boolean = false;
  modalName = '';
  updateId = '';
  closeResult = '';

  constructor(private curdserv:CurdserviceService, private modalService:NgbModal, private modalConfig:NgbModalConfig) {
    this.curdserv.getData().subscribe(result => {
      this.data = result;
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
      console.log(data, 'ere');
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
      console.log(result, 'test');
      window.location.reload();
    });
  }

}
