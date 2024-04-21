import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AdvertiserFormService } from "./create-advertiser.form";

@Component({
  selector: "app-create-advertiser-dialog",
  templateUrl: "./create-advertiser-dialog.component.html",
  styleUrl: "./create-advertiser-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdvertiserFormService],
})
export class CreateAdvertiserDialogComponent {
  advertiserForm = this.advertiserFormService.createForm();
  advertiserFormConfig = this.advertiserFormService.formConfig;
  constructor(
    public dialogRef: MatDialogRef<CreateAdvertiserDialogComponent>,
    private advertiserFormService: AdvertiserFormService,
  ) {}

  onSave(): void {
    if (this.advertiserForm.valid) {
      this.dialogRef.close(this.advertiserForm.value);
    } else {
      this.advertiserForm.markAllAsTouched();
    }
  }
}
