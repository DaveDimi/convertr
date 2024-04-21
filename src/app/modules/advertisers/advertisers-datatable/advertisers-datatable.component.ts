import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material/table";
import { Advertiser } from "../../../shared/models/advertisers.interface";

@Component({
  selector: "app-advertisers-datatable",
  templateUrl: "./advertisers-datatable.component.html",
  styleUrl: "./advertisers-datatable.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertisersDatatableComponent implements OnChanges {
  @Input({ required: true }) isLoading: boolean | undefined;
  @Input({ required: true }) isFailure: HttpErrorResponse | undefined;
  @Input({ required: true }) advertisers: Advertiser[] | undefined;

  displayedColumns: string[] = [
    "name",
    "orgurl",
    "telephone",
    "address",
    "postCode",
  ];
  dataSource = new MatTableDataSource<Advertiser>([]);
  isListEmpty = false;
  ngOnChanges(changes: SimpleChanges) {
    if (changes["advertisers"]) {
      this.dataSource.data = this.advertisers || [];
      this.isListEmpty = !this.advertisers?.length;
    }
  }
}
