import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AdvertisersComponent } from "./advertisers/advertisers.component";

const routes: Route[] = [
  {
    path: "",
    component: AdvertisersComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertisersRoutingModule {}
