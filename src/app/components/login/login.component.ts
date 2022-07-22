import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorMessageComponent } from '../common/error-message/error-message.component';
import { LoadingComponent } from '../common/loading/loading.component';
import { SuccessMessageComponent } from '../common/success-message/success-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output() window = new EventEmitter<string>();

  private emailFormControl = new FormControl('', [Validators.email, Validators.required]);
  private passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]);

  form = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl
  });

  constructor(private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit(): void { }

  login() {
    this.dialog.open(LoadingComponent, {
      width: '250px',
      height: '250px',
      disableClose: true
    });

    const data = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    this.auth.iniciarSesion(data).subscribe((result) => {
      console.log(result);

      localStorage.setItem('CrearteData', JSON.stringify({
        name: (result as any).name,
        token: (result as any).token,
        shopingCart: {
          products: [],
          total: 0
        }
      }));

      window.dispatchEvent(new Event('storage'));
      this.form.reset();

      this.dialog.closeAll();
      this.dialog.open(SuccessMessageComponent, {
        width: '250px',
        data: {
          title: 'Iniciaste sesión',
          message: 'Ya puedes comprar productos'
        }
      });

      this.window.emit('catalogue');

    }, (error) => {
      this.dialog.closeAll();
      switch (error.status) {
        case 419: {
          this.dialog.closeAll();
          this.dialog.open(ErrorMessageComponent, {
            width: '250px',
            data: {
              title: 'Ya tienes una cuenta',
              message: 'Ya tienes una cuenta registrada con ese email, intenta utilizar otra dirección de correo'
            }
          });
          break;
        }

        case 401: {
          this.dialog.closeAll();
          this.dialog.open(ErrorMessageComponent, {
            width: '250px',
            data: {
              title: 'La contraseña es incorrecta',
              message: 'La contraseña que ingresaste es incorrecta, intentalo nuevamente'
            }
          });
          break;
        }

        case 404: {
          this.dialog.closeAll();
          this.dialog.open(ErrorMessageComponent, {
            width: '250px',
            data: {
              title: 'El usuario no existe',
              message: 'El correo que ingresaste no se encuentra registrado, vuelve a intentarlo o registrate'
            }
          });
          break;
        }

        default: {
          this.dialog.closeAll();
          this.dialog.open(ErrorMessageComponent, {
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
