import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdvertisersRoutingModule } from "./advertisers.routing.module";
import { AdvertisersComponent } from "./advertisers/advertisers.component";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AdvertisersEffects } from "./state/advertisers/advertisers.effects";
import { advertisersReducer } from "./state/advertisers/advertisers.reducer";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { AdvertisersService } from "../../shared/services/advertisers.service";
import { ADVERTISERS_FEATURE_KEY } from "./state/advertisers/advertisers.actions";
import { AdvertisersDatatableComponent } from "./advertisers-datatable/advertisers-datatable.component";
import { AddressesService } from "../../shared/services/addresses.service";
import { MatButtonModule } from "@angular/material/button";
import { CreateAdvertiserDialogComponent } from "./create-advertiser-dialog/create-advertiser-dialog.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";

@NgModule({
  declarations: [
    AdvertisersComponent,
    AdvertisersDatatableComponent,
    CreateAdvertiserDialogComponent,
  ],
  imports: [
    CommonModule,
    AdvertisersRoutingModule,
    EffectsModule.forFeature([AdvertisersEffects]),
    StoreModule.forFeature(ADVERTISERS_FEATURE_KEY, advertisersReducer),
    MatProgressSpinnerModule,
    MatTableModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [AdvertisersService, AddressesService],
})
export class AdvertisersModule {}
