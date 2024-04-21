import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Address } from "../models/addresses.interface";

@Injectable()
export class AddressesService {
  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http
      .get<{ "hydra:member": Address[] }>(`${environment.apiUrl}addresses`)
      .pipe(map((addresses) => addresses["hydra:member"]));
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${environment.apiUrl}addresses`, address);
  }
}
