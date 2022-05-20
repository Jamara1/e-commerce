import { Client } from './../../interfaces/client.interface';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-index',
  templateUrl: './client-index.component.html',
  styles: [],
})
export class ClientIndexComponent implements OnInit {
  public clients: Client[] = [];
  public firstnameFilter = '';
  public lastnameFilter = '';
  public emailFilter = '';

  constructor(private _clientService: ClientService) {}

  ngOnInit(): void {
    this._clientService.getClients(null, null).subscribe({
      next: (response) => (this.clients = response.data),
      error: (err) => console.log(err),
    });
  }

  filter(type: string) {
    if (type === 'firstname') {
      this._clientService.getClients(type, this.firstnameFilter).subscribe({
        next: (response) => (this.clients = response.data),
        error: (err) => console.log(err),
      });
    } else if (type === 'lastname') {
      this._clientService.getClients(type, this.lastnameFilter).subscribe({
        next: (response) => (this.clients = response.data),
        error: (err) => console.log(err),
      });
    } else {
      this._clientService.getClients(type, this.emailFilter).subscribe({
        next: (response) => (this.clients = response.data),
        error: (err) => console.log(err),
      });
    }
  }
}
