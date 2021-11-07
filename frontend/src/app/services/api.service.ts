import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Device } from '../models/device.model';
import { Observable } from "rxjs";


@Injectable()
export class DeviceService {
    baseUrl: string; 
    constructor(private http: HttpClient){
        this.baseUrl = environment.apiurl;
    }
    public getDevices(): Observable<Device[]> {
        return this.http.get<Device[]>(this.baseUrl + '/api/devices');
    }

    public deleteDevice(id: string): Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + '/api/devices/' + id);
    }
}