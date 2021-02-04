import { Component, OnInit, TemplateRef } from '@angular/core';
import {MainService} from '../main.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../user';
import { Router } from '@angular/router';
import {Store ,select} from '@ngrx/store';
import * as UserAction from '../user.actions';
import * as fromUser from '../user.selectors'


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  User=[]
  modalRef:BsModalRef
  onlyUser: any
  errorMessage=''

  constructor(private mainService:MainService,
    private modalService:BsModalService,
    private router:Router,
    private store:Store
    ) { }

  ngOnInit(): void {
    
    this.store.dispatch(new UserAction.LoadUsers()); //action dispatched
    // this.User = this.store.select(selectAllTodos);
    this.store.select(fromUser.getUsers).subscribe(
      users=>{      
        this.User=users
      }
    )

    // this.store.pipe(
    //   select(fromUser.getUsers)
    // ).subscribe(
    //   users=>{
    //     this.User=users.users
    //     console.log("inside on init");
        
    //   }
    // )
    // this.store.pipe(select(fromUser.getError)).subscribe(
    //   err => {
    //     this.errorMessage = err;
    //   }
    // )
    // this.mainService.getUser().subscribe({
    //   next:user=>this.User=user,
    //   error:err=>console.log("error message ",err)
      
    // })
  }
  deleteEntry(id){
    this.store.dispatch(new UserAction.DeleteUser(id));
    this.store.dispatch(new UserAction.LoadUsers()); //action dispatched

    this.store.pipe(
      select(fromUser.getUsers)
    ).subscribe(
      users=>{
        this.User=users
        console.log("users   ",this.User);
        
        console.log("inside on init");
        
      }
    )
    // console.log("user after deletion ",this.User);
    
    // this.mainService.deleteUser(id).subscribe(
    //   data=>{
    //     this.mainService.getUser().subscribe(
    //       user=>this.User=user
    //     )
    //   }
    // )

  }
  edit(user){
    this.mainService.userArray=user
    this.mainService.editFlag=true
    this.router.navigateByUrl('/')
  }
  openModal(template: TemplateRef<any>,id) {

    // this.mainService.getByUserId(id).subscribe(
    //   data=>{console.log("data ",data);
    //     this.onlyUser=data
    //     this.modalRef = this.modalService.show(template);

    //   }

    // )

    // this.store.dispatch(new UserAction.GetUserById(id));
    // console.log("Abhi ::::");
  
    this.store.pipe(
      select(fromUser.getOneUsers)
    ).subscribe(
      user=>{
        this.onlyUser=user[id]
        console.log("this is user ",user[id]);
      },
      err=>console.log("err",err),
      // ()=>{
      //   this.modalRef = this.modalService.show(template);
      //   console.log("completed");
        
      // }
      
    )
    this.modalRef = this.modalService.show(template);
    console.log("completed");



  }

}
