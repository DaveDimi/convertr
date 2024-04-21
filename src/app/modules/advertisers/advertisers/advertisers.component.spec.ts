import {
  byText,
  createComponentFactory,
  mockProvider,
  Spectator,
} from "@ngneat/spectator/jest";
import { AdvertisersComponent } from "./advertisers.component";
import { AdvertisersFacade } from "../state/advertisers/advertisers.facade";
import { MatTableModule } from "@angular/material/table";
import { Subscription } from "rxjs";
import { signal, WritableSignal } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AdvertisersDatatableComponent } from "../advertisers-datatable/advertisers-datatable.component";
import {
  Advertiser,
  AdvertiserWithAddress,
} from "../../../shared/models/advertisers.interface";
import { MatDialogModule } from "@angular/material/dialog";
import { Address } from "../../../shared/models/addresses.interface";

const address: Address = {
  "@id": "/address/1",
  id: 1,
  address: "address",
  city: "city",
  postcode: "postcode",
  updatedTs: "updatedTs",
};

const advertiser: AdvertiserWithAddress = {
  id: 1,
  name: "name",
  orgurl: "orgurl",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  telephone: "telephone",
  updatedTs: "updatedTs",
  address: "/address/1",
  addressDetails: address,
};

const isAdvertisersFailure$$: WritableSignal<undefined | HttpErrorResponse> =
  signal(undefined);
const isLoadingAdvertisers$$: WritableSignal<boolean> = signal(false);
const advertisers$$: WritableSignal<Advertiser[]> = signal([]);

const mockAdvertisersFacade: Pick<
  AdvertisersFacade,
  "advertisers$$" | "isLoadingAdvertisers$$" | "isAdvertisersFailure$$"
> = {
  isAdvertisersFailure$$: isAdvertisersFailure$$.asReadonly(),
  isLoadingAdvertisers$$: isLoadingAdvertisers$$.asReadonly(),
  advertisers$$: advertisers$$.asReadonly(),
};

describe("AdvertisersComponent", () => {
  let spectator: Spectator<AdvertisersComponent>;

  const createComponent = createComponentFactory({
    component: AdvertisersComponent,
    declarations: [AdvertisersDatatableComponent],
    imports: [MatTableModule, MatProgressSpinnerModule, MatDialogModule],
    providers: [mockProvider(AdvertisersFacade, mockAdvertisersFacade)],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create", () => {
    expect(spectator.component).toBeTruthy();
  });

  it("should initialize and load advertisers list", () => {
    expect(
      spectator.inject(AdvertisersFacade).loadAdvertisers,
    ).toHaveBeenCalledTimes(1);
  });

  describe("When advertiser endpoint is loading", () => {
    beforeEach(() => {
      isLoadingAdvertisers$$.set(true);
      spectator.detectChanges();
    });

    it("should display loading spinner", () => {
      expect(spectator.query(".loading-shade")).toBeTruthy();
    });
  });

  describe("When advertiser endpoint is failure", () => {
    beforeEach(() => {
      isAdvertisersFailure$$.set(new HttpErrorResponse({ status: 500 }));
      spectator.detectChanges();
    });

    it("should display error message", () => {
      expect(
        spectator.query(byText("Oops, something went wrong.")),
      ).toBeTruthy();
    });
  });

  describe("When advertiser list is empty", () => {
    beforeEach(() => {
      advertisers$$.set([]);
      isLoadingAdvertisers$$.set(false);
      isAdvertisersFailure$$.set(undefined);
      spectator.detectChanges();
    });

    it("should display empty list message", () => {
      expect(spectator.query(byText("No Advertisers Found."))).toBeTruthy();
    });
  });

  describe("When advertiser list is loaded", () => {
    beforeEach(() => {
      advertisers$$.set([advertiser]);
      isLoadingAdvertisers$$.set(false);
      spectator.detectChanges();
    });

    it("should display the table", () => {
      expect(spectator.query(".table-container")).toBeTruthy();
    });
  });
});
