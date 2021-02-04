import { Component, OnInit,TemplateRef } from '@angular/core';

import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import {MainService} from '../main.service'
import { Router } from '@angular/router';
import {Store ,select} from '@ngrx/store';
import * as UserAction from '../user.actions';
import * as fromUser from '../user.selectors'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  signupForm:FormGroup
  val:any
  data={}
  editFlag=this.mainService.editFlag
  constructor(private formbuilder:FormBuilder,
    private mainService:MainService,
    private router:Router,
    private store:Store
    ) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({

      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("^[a-zA-Z ]+")])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
    })
    if(this.editFlag){
      this.mainService.id=this.mainService.userArray.id
          this.data=this.mainService.userArray
          console.log("this is user ",this.data);
          this.signupForm.patchValue({
            name:this.data["name"],
            email:this.data["email"],
            mobile:this.data["mobile"]
          })
        }
  }



  get f(){
    return this.signupForm.controls
  }
  submit(){
    console.log("values ",this.signupForm.value);
    this.store.dispatch(new UserAction.PostUser({
      data:this.signupForm.value
    }))
    this.signupForm.reset
    this.router.navigateByUrl('/view')

    // this.mainService.postUser(this.signupForm.value).subscribe(data=>{
    //   this.val=data
    //   this.signupForm.reset
    //   this.router.navigateByUrl('/view')
    // })
  
  }


  update(){
    console.log("data put ",this.signupForm.value);
    console.log("id",this.mainService.id);
    
    this.store.dispatch(new UserAction.EditUser({
      data:this.signupForm.value,
      id:this.mainService.id
    }))
         this.signupForm.reset()
        this.mainService.editFlag=false
        this.router.navigateByUrl('/view')
    // this.mainService.updateUser(this.mainService.id,this.signupForm.value).subscribe(
    //   data=>{
    //     console.log("updated data",data);
    //     this.signupForm.reset
    //     this.mainService.editFlag=false
    //     this.router.navigateByUrl('/view')
        

        
    //   }
    // )
  }

}
