import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import {
  Advertiser,
  AdvertiserWithAddress,
} from "../../../../shared/models/advertisers.interface";
import { Address } from "../../../../shared/models/addresses.interface";

export const ADVERTISERS_FEATURE_KEY = "advertisers";

export const advertisersActions = createActionGroup({
  source: "Advertisers Page",
  events: {
    "Load Advertisers": emptyProps(),
    "Load Advertisers Success": props<{
      advertisers: AdvertiserWithAddress[];
    }>(),
    "Load Advertisers Failure": props<{
      error: HttpErrorResponse | undefined;
    }>(),
    "Create Advertiser With Address": props<{
      advertiser: Advertiser;
      address: Address;
    }>(),
    "Create Advertiser With Address Success": emptyProps(),
    "Create Advertiser With Address Failure": props<{
      error: HttpErrorResponse;
    }>(),
  },
});
