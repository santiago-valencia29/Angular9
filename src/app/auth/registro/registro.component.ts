import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/auth/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService,
              private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    // this.usuario.email = 'fernando.herrera85@gmail.com';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
      .subscribe(resp => {
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      }, (err) => {
        Swal.fire({
          title: 'Error al Registrar',
          icon: 'error',
          text: err.error.error.message,
          
        });
      });

  }

}
