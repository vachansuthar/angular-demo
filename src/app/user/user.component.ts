import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/Model/UserModel';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,private route: Router, private router: ActivatedRoute) { }

  userDetails:UserModel
  userForm: FormGroup
  id: number

  ngOnInit(): void {
    this.router.params.subscribe(data=>{
      this.id = data.id ? data.id : '';
      this.getUser();
    })

    this.userForm = new FormGroup({
      id: new FormControl(''),
      UserName: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', Validators.required),
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      MobileNo: new FormControl('', [Validators.required
        , Validators.maxLength(10)
        , Validators.minLength(10)])
    })
    
  }

  getUser() {
    this.userService.getUser(this.id).subscribe(data=>{
    this.userDetails = data;     
    this.userForm.patchValue({
      UserName: data.UserName,
      Password: data.Password,
      FirstName: data.FirstName,
      LastName: data.LastName,
      MobileNo: data.MobileNo,
      id: data.id
    }) 
    })
  }

  submitForm() {
    this.userForm.markAllAsTouched();
    if(this.userForm.valid) {
      this.userDetails = this.userForm.getRawValue()
      if(this.id) {
        this.userService.updateUsers(this.userDetails).subscribe(data=>{
          this.route.navigate(['user-list']);
        });
      } else {
        this.userService.addUsers(this.userDetails).subscribe(data=>{
          this.route.navigate(['user-list']);
        });
      }
    }
  }

}
