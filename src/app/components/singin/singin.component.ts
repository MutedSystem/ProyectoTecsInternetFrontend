import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingComponent } from '../common/loading/loading.component';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  private nameFormControl = new FormControl('', [Validators.required]);
  private emailFormControl = new FormControl('', [Validators.email, Validators.required]);
  private phoneNumberFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)])
  private directionFormControl = new FormControl('', [Validators.required]);
  private passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
  private confirmPasswordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]);

  form = new FormGroup({
    name: this.nameFormControl,
    email: this.emailFormControl,
    phone: this.phoneNumberFormControl,
    direction: this.directionFormControl,
    password: this.passwordFormControl,
    confirmPassword: this.confirmPasswordFormControl
  });

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {}

  singin(){
    this.dialog.open(LoadingComponent,{
      width: '250px',
      height: 'w50px'
    });
  }

}
