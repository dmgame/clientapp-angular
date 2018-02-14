import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../services/client.service";
// Models
import { Client } from "../../models/Client";

import { MyPipePipe } from "../../pipes/my-pipe.pipe";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwned: number;

  constructor(
    private clientService: ClientService,
    private pipe: MyPipePipe
  ) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      console.dir(clients);
      this.clients = clients;
      this.totalOwned = this.getTotalOwned();

    })

    console.log(this.pipe.transform(10, "UAH"));
  }

  getTotalOwned() {
    return this.clients.reduce( ( total, client ) => {
        return total += client.balance;
    }, 0);
  }

}
