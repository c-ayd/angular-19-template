import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-question-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './question-dialog.component.html',
  styleUrl: './question-dialog.component.scss'
})
export class QuestionDialogComponent {
  public title: string = '';
  public message: string = '';
  public noButtonText: string = '';
  public yesButtonText: string = '';

  constructor(private dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = data.title;
    this.message = data.message;
    this.noButtonText = data.noButtonText;
    this.yesButtonText = data.yesButtonText
  }

  onNoClicked(): void {
    this.data.onNoClicked?.();
  }

  onYesClicked(): void {
    this.data.onYesClicked?.();
  }
}
