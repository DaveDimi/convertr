import { Injectable, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AdvertisersSelectors from "./advertisers.selectors";
import { advertisersActions } from "./advertisers.actions";
import { HttpErrorResponse } from "@angular/common/http";
import {
  Advertiser,
  AdvertiserForm,
} from "../../../../shared/models/advertisers.interface";
import { AdvertisersState } from "./advertisers.reducer";
import { Address } from "../../../../shared/models/addresses.interface";

@Injectable({
  providedIn: "root",
})
export class AdvertisersFacade {
  advertisers$$: Signal<Advertiser[]> = this.advertisersStore.selectSignal(
    AdvertisersSelectors.getAdvertisers,
  );
  isLoadingAdvertisers$$: Signal<boolean> = this.advertisersStore.selectSignal(
    AdvertisersSelectors.getIsLoadingAdvertisers,
  );
  isAdvertisersFailure$$: Signal<HttpErrorResponse | undefined> =
    this.advertisersStore.selectSignal(
      AdvertisersSelectors.getIsAdvertisersFailure,
    );

  constructor(private readonly advertisersStore: Store<AdvertisersState>) {}

  loadAdvertisers(): void {
    this.advertisersStore.dispatch(advertisersActions.loadAdvertisers());
  }

  createAdvertiser(advertiserForm: AdvertiserForm): void {
    const {
      name,
      orgurl,
      firstName,
      address,
      lastName,
      email,
      telephone,
      postcode,
      city,
    } = advertiserForm;
    const updatedTs = new Date().toDateString();
    const id = new Date().getMilliseconds();
    const addressId = `/addresses/${id}`;
    const advertiser: Advertiser = {
      id,
      name,
      orgurl,
      firstName,
      lastName,
      email,
      telephone,
      updatedTs,
      address: addressId,
    };
    const addressReq: Address = {
      "@id": addressId,
      id,
      address,
      city,
      postcode,
      updatedTs,
    };

    this.advertisersStore.dispatch(
      advertisersActions.createAdvertiserWithAddress({
        advertiser,
        address: addressReq,
      }),
    );
  }
}
