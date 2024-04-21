import { Address } from "./addresses.interface";

export interface Advertiser {
  id: number;
  name: string;
  orgurl: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  updatedTs: string;
  address: string;
}

export interface AdvertiserWithAddress extends Advertiser {
  addressDetails: Address;
}

export interface AdvertiserForm {
  name: string;
  orgurl: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: string;
  city: string;
  postcode: string;
}
