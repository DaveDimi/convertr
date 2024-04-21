import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Advertiser } from "../models/advertisers.interface";

@Injectable()
export class AdvertisersService {
  constructor(private http: HttpClient) {}
  getAdvertisers(): Observable<Advertiser[]> {
    return this.http
      .get<{ "hydra:member": Advertiser[] }>(`${environment.apiUrl}advertisers`)
      .pipe(map((advertisers) => advertisers["hydra:member"]));
  }
  createAdvertiser(advertiser: Advertiser): Observable<Advertiser> {
    return this.http.post<Advertiser>(
      `${environment.apiUrl}advertisers`,
      advertiser,
    );
  }
}
