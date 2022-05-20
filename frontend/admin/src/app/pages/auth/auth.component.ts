import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credential } from 'src/app/interfaces/credentials.interface';
import { Data } from 'src/app/interfaces/user.interface';
import { AdminService } from 'src/app/services/admin.service';

declare let jQuery: any;
declare let $: any;
declare let iziToast: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [],
})
export class AuthComponent implements OnInit {
  public credential: Credential = {
    email: '',
    password: '',
  };
  public user: Data | any;
  public token: string | null = '';

  constructor(private _adminService: AdminService, private _router: Router) {
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/panel/home']);
    }
  }

  login(form: NgForm) {
    if (!form.valid) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'The Form data are not valid',
      });

      return;
    }

    this._adminService.loginAdmin(this.credential).subscribe({
      next: (response) => {
        if (response.data === undefined) {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: response.message,
          });

          return;
        }

        if (!response._token) {
          return;
        }

        this.user = response.data;
        localStorage.setItem('token', response._token);
        localStorage.setItem('_id', response.data._id);

        this._router.navigate(['/panel/home']);
      },
      error: (err) => console.log(err),
    });
  }
}
