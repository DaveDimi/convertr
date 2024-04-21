import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AdvertisersFacade } from "../state/advertisers/advertisers.facade";
import { AdvertiserForm } from "../../../shared/models/advertisers.interface";
import { MatDialog } from "@angular/material/dialog";
import { CreateAdvertiserDialogComponent } from "../create-advertiser-dialog/create-advertiser-dialog.component";
import { filter, take } from "rxjs";

@Component({
  selector: "app-advertisers",
  templateUrl: "./advertisers.component.html",
  styleUrl: "./advertisers.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertisersComponent implements OnInit {
  advertisers$$ = this.advertisersFacade.advertisers$$;
  isLoadingAdvertisers$$ = this.advertisersFacade.isLoadingAdvertisers$$;
  isAdvertisersFailure$$ = this.advertisersFacade.isAdvertisersFailure$$;

  constructor(
    private readonly advertisersFacade: AdvertisersFacade,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadAdvertisers();
  }

  loadAdvertisers() {
    this.advertisersFacade.loadAdvertisers();
  }

  createAdvertiser() {
    const newAdvertiserDialogRef = this.dialog.open(
      CreateAdvertiserDialogComponent,
    );
    newAdvertiserDialogRef
      .afterClosed()
      .pipe(
        filter((advertiser) => !!advertiser),
        take(1),
      )
      .subscribe((advertiser: AdvertiserForm) =>
        this.advertisersFacade.createAdvertiser(advertiser),
      );
  }
}
