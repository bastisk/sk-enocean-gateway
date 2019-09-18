import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/services/api.service';
import { Device } from 'src/models/device.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  devices: Device[];

  constructor(private deviceService: DeviceService) { }

  async ngOnInit() {
    console.log("y");
    this.devices = await this.deviceService.getDevices();
    console.log(this.devices);

  }

}
