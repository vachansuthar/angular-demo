import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  userGroup: FormGroup

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.userGroup = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    })
  }

  Login() {
    this.userGroup.markAllAsTouched();
    if(this.userGroup.valid) {
      let credential = this.userGroup.getRawValue()
      this.userService.login(credential).subscribe(data=>{
        if(data && data.length > 0) {
          localStorage.setItem('token', 'test-token');
          this.router.navigate(['user-list']);
        } else {
          alert('Invalid credential');
        }
      });
    }
  }

}
