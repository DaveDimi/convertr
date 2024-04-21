import { createReducer, on } from "@ngrx/store";
import { advertisersActions } from "./advertisers.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { AdvertiserWithAddress } from "../../../../shared/models/advertisers.interface";

export interface AdvertisersState {
  advertisers: AdvertiserWithAddress[];
  isLoading: boolean;
  error: HttpErrorResponse | undefined;
}

export const ADVERTISERS_INITIAL_STATE: AdvertisersState = {
  advertisers: [],
  isLoading: false,
  error: undefined,
};
export const advertisersReducer = createReducer(
  ADVERTISERS_INITIAL_STATE,
  on(advertisersActions.loadAdvertisers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(advertisersActions.loadAdvertisersSuccess, (state, { advertisers }) => ({
    ...state,
    isLoading: false,
    advertisers,
  })),
  on(advertisersActions.loadAdvertisersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
