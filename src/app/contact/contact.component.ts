import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ContactService} from './contact-service/contact-service';
import { FormGroup, FormBuilder } from '@angular/forms';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name' , 'username', 'email','phone','website','company'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  private testInfo:any = [];
  statusMessage: any;
  form:FormGroup;
  edit_toggle : boolean= false;
  contact_detail ={
    email: "Sincere@april.biz",
    id: 1,
    name: "Leanne Graham",
    phone: "1-770-736-8031 x56442",
    username: "Bret",
    website: "hildegard.org",
    company:{
      bs: "synergize scalable supply-chains",
      catchPhrase: "Proactive didactic contingency",
      name: "Deckow-Crist"
    }
     
  };
  constructor(private contact_service :ContactService, 
    fb:FormBuilder) {
      this.form=fb.group({
        name:["", ],
        username:[""],
        email:[""],
         id:[""],
         phone:[""],
         website:["" ],
      })
     }

  ngOnInit(): void {

    this.contact_service.getHistory()
    .subscribe(
    ShowData => {
        this.testInfo = ShowData;
        this.dataSource =  new MatTableDataSource(this.testInfo)
        }, error => {
        this.statusMessage = error;
    });
  }


  applyFilter(filterValue: string) {
    if(filterValue.length > 3){
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource = new MatTableDataSource(this.testInfo);
      this.dataSource.filter = filterValue;
    }else if(filterValue.length == 0){
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource = new MatTableDataSource(this.testInfo);
      this.dataSource.filter = filterValue;
    }
  }

  showDetail(data){
    this.contact_detail=data;
    console.log(this.contact_detail)
  }
  editDetails(data){
    this.edit_toggle =true;
    this.form.setValue({
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      website : data.website
    });
    console.log(data)
  }
  submitEditData(){
    this.contact_service.updateData(this.form.value).subscribe(
      data=>{
       console.log(data);
       this.dataSource.data[data.id -1] = this.form.value;
       this.dataSource._updateChangeSubscription();
      // alert("updated successfully")
      //  this.form.reset();
      },error=>{
        this.statusMessage = error;
      }
    )
    this.edit_toggle =false;
    this.contact_detail = this.form.value  
    }
}
