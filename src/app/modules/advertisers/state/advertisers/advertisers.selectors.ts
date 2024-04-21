import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ADVERTISERS_FEATURE_KEY } from "./advertisers.actions";
import { AdvertisersState } from "./advertisers.reducer";

export const getAdvertisersState = createFeatureSelector<AdvertisersState>(
  ADVERTISERS_FEATURE_KEY,
);

export const getAdvertisers = createSelector(
  getAdvertisersState,
  (state: AdvertisersState) => state.advertisers,
);

export const getIsLoadingAdvertisers = createSelector(
  getAdvertisersState,
  (state: AdvertisersState) => state.isLoading,
);

export const getIsAdvertisersFailure = createSelector(
  getAdvertisersState,
  (state: AdvertisersState) => state.error,
);
