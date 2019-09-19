import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/services/api.service';
import { Device } from 'src/models/device.model';
import Swal from 'sweetalert2'

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

  async refreshData() {
    this.devices = await this.deviceService.getDevices();
  }

  public async deleteDevice(device: Device) {
    let self = this;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonClass: 'confirm-btn',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.value) {
        await this.deviceService.deleteDevice(device.id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(function() {
          self.refreshData();
        })
      }
    })
  }

}
