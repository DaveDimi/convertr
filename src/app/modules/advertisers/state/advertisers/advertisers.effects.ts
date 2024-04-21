import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { advertisersActions } from "./advertisers.actions";
import { catchError, forkJoin, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { AdvertisersService } from "../../../../shared/services/advertisers.service";
import { AddressesService } from "../../../../shared/services/addresses.service";
import { Address } from "../../../../shared/models/addresses.interface";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AdvertisersEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly advertisersService: AdvertisersService,
    private readonly addressesService: AddressesService,
    private readonly snackBar: MatSnackBar,
  ) {}

  private showErrorSnackBar(): void {
    this.snackBar.open("Oops, something went wrong.", "", {
      duration: 3000,
    });
  }

  loadAdvertisers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(advertisersActions.loadAdvertisers),
      switchMap(() => {
        return forkJoin([
          this.advertisersService.getAdvertisers(),
          this.addressesService.getAddresses(),
        ]).pipe(
          map(([advertisers, addresses]) => {
            const addressMap: { [key: string]: Address } = addresses.reduce(
              (acc: { [key: string]: Address }, address) => {
                acc[address["@id"]] = address;
                return acc;
              },
              {},
            );

            const advertisersWithAddresses = advertisers.map((advertiser) => ({
              ...advertiser,
              addressDetails: addressMap[advertiser.address] || null,
            }));

            return advertisersActions.loadAdvertisersSuccess({
              advertisers: advertisersWithAddresses,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this.showErrorSnackBar();
            return of(
              advertisersActions.loadAdvertisersFailure({
                error,
              }),
            );
          }),
        );
      }),
    ),
  );

  createAdvertiser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(advertisersActions.createAdvertiserWithAddress),
      switchMap(({ advertiser, address }) => {
        return forkJoin([
          this.advertisersService.createAdvertiser(advertiser),
          this.addressesService.createAddress(address),
        ]).pipe(
          map(() => {
            this.snackBar.open("Advertiser created successfully.", "", {
              duration: 3000,
            });
            return advertisersActions.createAdvertiserWithAddressSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            this.showErrorSnackBar();
            return of(
              advertisersActions.createAdvertiserWithAddressFailure({ error }),
            );
          }),
        );
      }),
    ),
  );
}
