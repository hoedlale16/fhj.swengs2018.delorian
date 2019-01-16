export interface Alert {
  alertType: AlertType;
  alertText: string;
}


export enum AlertType {
  success,
  info,
  danger
}
