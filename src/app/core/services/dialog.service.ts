import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogOptions } from '../models/info-dialog-options.model';
import { InfoDialogComponent } from '../../shared/components/dialogs/info-dialog/info-dialog.component';
import { QuestionDialogOptions } from '../models/question-dialog-options.model';
import { QuestionDialogComponent } from '../../shared/components/dialogs/question-dialog/question-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openInfoDialog(options: Partial<InfoDialogOptions>): void {
    const dialogWindow = this.dialog.open(InfoDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        buttonText: options.buttonText,
        onButtonClicked: options.onButtonClicked
      }
    });

    dialogWindow.afterClosed().subscribe(() => {
      options.onClosed?.();
    });
  }

  openQuestionDialog(options: Partial<QuestionDialogOptions>): void {
    const dialogWindow = this.dialog.open(QuestionDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        noButtonText: options.noButtonText,
        yesButtonText: options.yesButtonText,
        onNoClicked: options.onNoClicked,
        onYesClicked: options.onYesClicked
      }
    });

    dialogWindow.afterClosed().subscribe(() => {
      options.onClosed?.();
    });
  }
}
