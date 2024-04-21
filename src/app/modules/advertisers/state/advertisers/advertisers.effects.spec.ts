import { AdvertisersEffects } from "./advertisers.effects";
import { NEVER, Observable, of, throwError } from "rxjs";
import { Action } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { Advertiser } from "../../../../shared/models/advertisers.interface";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from "jasmine-marbles";
import { advertisersActions } from "./advertisers.actions";
import { MatDialogModule } from "@angular/material/dialog";
import { AdvertisersService } from "../../../../shared/services/advertisers.service";
import { AddressesService } from "../../../../shared/services/addresses.service";
import { Address } from "../../../../shared/models/addresses.interface";
import { MatSnackBarModule } from "@angular/material/snack-bar";

const advertiser: Advertiser = {
  id: 1,
  name: "name",
  orgurl: "orgurl",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  telephone: "telephone",
  updatedTs: "updatedTs",
  address: "/address/1",
};

const address: Address = {
  "@id": "/address/1",
  id: 1,
  address: "address",
  city: "city",
  postcode: "postcode",
  updatedTs: "updatedTs",
};

const advertiserWithAddress = {
  ...advertiser,
  addressDetails: address,
};

describe("AdvertisersEffects", () => {
  let effects: AdvertisersEffects;
  let actions: Observable<Action>;

  const mockAdvertisersService: Pick<
    AdvertisersService,
    "getAdvertisers" | "createAdvertiser"
  > = {
    getAdvertisers: jest.fn().mockReturnValue(of([advertiser])),
    createAdvertiser: jest.fn().mockReturnValue(of(advertiser)),
  };

  const mockAddressesService: Pick<
    AddressesService,
    "getAddresses" | "createAddress"
  > = {
    getAddresses: jest.fn().mockReturnValue(of([address])),
    createAddress: jest.fn().mockReturnValue(of(address)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule],
      providers: [
        AdvertisersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: AdvertisersService,
          useValue: mockAdvertisersService,
        },
        {
          provide: AddressesService,
          useValue: mockAddressesService,
        },
      ],
    });
    effects = TestBed.inject(AdvertisersEffects);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When loadAdvertisers action is dispatched", () => {
    beforeEach(() => {
      actions = cold("-a", {
        a: advertisersActions.loadAdvertisers(),
      });
    });

    it("should dispatch an action to update advertiser list", () => {
      expect(effects.loadAdvertisers$).toBeObservable(
        cold("-a", {
          a: advertisersActions.loadAdvertisersSuccess({
            advertisers: [advertiserWithAddress],
          }),
        }),
      );
    });
  });
});
