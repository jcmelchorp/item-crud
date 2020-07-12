import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';


@Injectable()
export class NotificationService {
  constructor(
    public snack: MatSnackBar
  ) { }

  showNotification(message: string, action: any, seconds: number): MatSnackBarRef<any> {
    return this.snack.open(message, action, { duration: seconds * 1000, verticalPosition: 'top', horizontalPosition: 'center' });
  }
}
