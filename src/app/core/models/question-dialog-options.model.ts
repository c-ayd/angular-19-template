export interface QuestionDialogOptions {
  title: string,
  message: string,
  noButtonText: string,
  yesButtonText: string,
  onNoClicked: () => void,
  onYesClicked: () => void,
  onClosed: () => void
}