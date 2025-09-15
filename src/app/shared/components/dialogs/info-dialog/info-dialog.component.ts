import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-info-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {
  public title: string;
  public message: string;
  public buttonText: string;

  constructor(private dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = data.title;
    this.message = data.message;
    this.buttonText = data.buttonText;
  }

  onButtonClicked(): void {
    this.data.onButtonClicked?.();
  }
}
