import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/userService';
import { User } from '../../../domain/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-existing-user',
  standalone: false,
  
  templateUrl: './existing-user.component.html',
  styleUrl: './existing-user.component.css'
})
export class ExistingUserComponent implements OnInit {
  existingUser: boolean = false;
  message:string="User does not exist yet Check the user and password you entered or register by clicking on login"
  formLogin: FormGroup=new FormGroup({})

  
  constructor(private userService: UserService) { }
  submitted: boolean = false
  users: User[] | undefined
  ngOnInit(): void {
    this.existingUser=false
    this.formLogin= new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
    });
    this.userService.getUsersDataFromServer().subscribe(data => {
      this.users = data;
    },
      (err) => {
        console.log(`faild on get users from data ${err}`)
      })

  }
  existingPassword(password: string) {

    if (this.users?.find((user) => user.password == password))
      return true
    return false
  }
  entry() {
    console.log(`entry`)
    this.users?.forEach(e => console.log(`${e.username} ${e.password}`))
    this.submitted = true
    console.log(`submitted: ${this.submitted}`)
    this.existingUser = this.existingPassword(this.formLogin.controls['Password'].value)
    

  }
}
