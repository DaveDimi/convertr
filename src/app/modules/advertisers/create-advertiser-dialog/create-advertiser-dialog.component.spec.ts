import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from "@ngneat/spectator/jest";
import { CreateAdvertiserDialogComponent } from "./create-advertiser-dialog.component";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

describe("CreateAdvertiserDialogComponent", () => {
  let spectator: Spectator<CreateAdvertiserDialogComponent>;

  const createComponent = createComponentFactory({
    component: CreateAdvertiserDialogComponent,
    declarations: [CreateAdvertiserDialogComponent],
    imports: [
      MatDialogModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      MatButtonModule,
    ],
    providers: [mockProvider(MatDialogRef, {})],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it("should create", () => {
    expect(spectator.component).toBeTruthy();
  });
});
