import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth,GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  providers:[UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  users:any;
  myValidation = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+(\.com){1}$/)]),
    password: new FormControl("",Validators.required)
  })

  get emailValid(){
    return this.myValidation.controls['email'].valid;
  }
  get passwordValid(){
    return this.myValidation.controls['password'].valid;
  }
  constructor(private usrService:UserService, private router:Router,private afAuth:Auth){
  }
  ngOnInit(): void {
    this.usrService.getAllUsers().subscribe({
      next:(data)=>{
        this.users= data;
      },
      error:(err)=>{console.log(err);
      }
    });
  }
  onLogin(){
    if(this.myValidation.valid){ 
      let foundedUser = this.users.find((u:any)=>(u.email === this.myValidation.value.email && u.Password === this.myValidation.value.password))
      if(foundedUser){
         localStorage.setItem("currentUser",JSON.stringify(foundedUser));
         this.router.navigateByUrl('/home')
       }
       else alert('Wrong Email Or Password');
     }
  }
  onGoogleLogin(){
    signInWithPopup(this.afAuth,new GoogleAuthProvider()).then((response)=>{
      const foundedUser =  this.users.find((u:any) => u.email === response.user.email)
      if(foundedUser){
        localStorage.setItem("currentUser",JSON.stringify(foundedUser));
        this.router.navigateByUrl('/home')
      }
      else alert('Wrong Email Or Password');
    }).catch((error)=>alert(error.message))
  }
}
