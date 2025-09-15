export interface InfoDialogOptions {
  title: string,
  message: string,
  buttonText: string,
  onButtonClicked: () => void,
  onClosed: () => void
}