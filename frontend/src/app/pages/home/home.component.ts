import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  devices: Device[] = [];

  constructor(
    private deviceService: DeviceService,
  ) { }

  ngOnInit(): void {
    console.log("y");
    this.refreshData();
    console.log(this.devices);
  }

  refreshData() {
    this.deviceService.getDevices().subscribe((event) => {
      this.devices = event;
    })
  }

  deleteDevice(device: Device) {
    let self = this;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      customClass: {
        confirmButton: 'confirm-btn'
      },
    }).then((result) => {
      if (result.value) {
        this.deviceService.deleteDevice(device.id).subscribe((event) => {
          if(event === true) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            ).then(function() {
              self.refreshData();
            })
          }
        });
      }
    });

    
  }


}
