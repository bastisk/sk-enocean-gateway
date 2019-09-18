import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Device } from 'src/models/device.model';


@Injectable()
export class DeviceService {
    baseUrl: string; 
    constructor(private http: HttpClient){
        this.baseUrl = environment.apiurl;
    }
    public getDevices(): Promise<Device[]> {
            return this.http.get<Device[]>(this.baseUrl + '/api/devices').toPromise();
    }
}