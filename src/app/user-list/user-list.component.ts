import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/Model/UserModel';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }

  @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;

  userList:UserModel[]
  userId:number

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data=> {
      this.userList = data;      
    })
  }

  confirmDelete(id) {
    this.userId = id;
    this.confirmDialog.isOpen = true;
  }

  isConfirm() {
    this.userService.deleteUsers(this.userId).subscribe(data=>{
      this.getUsers();
    });    
  }

}
