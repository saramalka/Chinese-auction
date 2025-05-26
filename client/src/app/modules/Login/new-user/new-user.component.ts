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
    Password: ''
  }
  formUser:User={
    Password: ''
  }
  submited: boolean = false
  existingUser: boolean = false
  users: User[] | undefined
  constructor(private _userService: UserService) {
    // this._userService.getUsersDataFromServer().subscribe(data => {
    //   this.users = data
    // }, err => {
    //   console.log(`error in get users from server: ${err}`)
    // })
  }
  registerForm: FormGroup = new FormGroup({
    "Fullname": new FormControl("", Validators.required),
    "Username": new FormControl("", Validators.required),
    "Email": new FormControl("", [Validators.required, Validators.email]),
    "Phone": new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
    "Password": new FormControl("", [Validators.required, Validators.minLength(3)])
  });


  onRegister() {
    this.submited = true
    this.existingUser = this.users?.find(user => user.Username === this.registerForm.controls['Username'].value) != null
    this.formUser=this.registerForm.value
    this.formUser.Gifts=[]
    console.log('Payload being sent to the server:', this.formUser);
    this.user = this.formUser
  
    this._userService.register(this.user).subscribe(data => {
      if (data)
        alert('user rgister succesfull')
        // this._userService.getUsersDataFromServer().subscribe(data=>{
        //   this.users=data
        //   console.log(`add user successful` ,this.users)
        // })
       
    },
      err => {
        console.log(`error to add user ${JSON.stringify(err)}`)
      })
  }
}
