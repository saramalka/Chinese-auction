import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/userService';
import { User } from '../../../domain/user';


@Component({
  selector: 'app-new-user',
  standalone: false,

  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  user: User = {
    password: ''
  }
  formUser:User={
    password: ''
  }
  submited: boolean = false
  existingUser: boolean = false
  users: User[] | undefined
  constructor(private _userService: UserService) {
    this._userService.getUsersDataFromServer().subscribe(data => {
      this.users = data
    }, err => {
      console.log(`error in get users from server: ${err}`)
    })
  }
  registerForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "phone": new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
    "password": new FormControl("", [Validators.required, Validators.minLength(8)])
  });
  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

  onRegister() {
    this.submited = true
    this.existingUser = this.users?.find(user => user.password === this.registerForm.controls['password'].value) != null
    this.formUser=this.registerForm.value
    this.formUser.id=this.createId()
    this.formUser.giftList=[]
    console.log('Payload being sent to the server:', this.formUser);
    this.user = this.formUser
  
    this._userService.post(this.user).subscribe(data => {
      if (data)
        this._userService.getUsersDataFromServer().subscribe(data=>{
          this.users=data
          console.log(`add user successful` ,this.users)
        })
       
    },
      err => {
        console.log(`error to add user ${err}`)
      })
  }
}
