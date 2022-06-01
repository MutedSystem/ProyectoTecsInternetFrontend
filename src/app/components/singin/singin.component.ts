import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorMessageComponent } from '../common/error-message/error-message.component';
import { LoadingComponent } from '../common/loading/loading.component';
import { SuccessMessageComponent } from '../common/success-message/success-message.component';

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

  constructor(private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit(): void { }

  singin() {
    this.dialog.open(LoadingComponent, {
      width: '250px',
      height: '250px',
      disableClose: true
    });

    const data = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      name: this.form.get('name')?.value,
      phone: this.form.get('phone')?.value,
      direction: this.form.get('direction')?.value,
      role: 'user'
    }

    this.auth.registrar(data).subscribe((result) => {
      this.dialog.closeAll();
      this.dialog.open(SuccessMessageComponent, {
        width: '250px',
        data: {
          title: 'Registrado correctamente',
          message: 'El usuario se ha registrado correctamente, ahora puedes iniciar sesión'
        }
      });
      this.form.reset();
    }, (error) => {
      this.dialog.closeAll();
      switch (error.status) {
        case 419: {
          this.dialog.closeAll();
          this.dialog.open(SuccessMessageComponent, {
            width: '250px',
            data: {
              title: 'Ya tienes una cuenta',
              message: 'Ya tienes una cuenta registrada con ese email, intenta utilizar otra dirección de correo'
            }
          });
          break;
        }

        default: {
          this.dialog.closeAll();
          this.dialog.open(SuccessMessageComponent, {
            width: '250px',
            data: {
              title: 'Algo salió mal',
              message: 'Hay un problema con los servidores, intentalo más tarde'
            }
          });
          break;
        }
      }
    });

  }

}
