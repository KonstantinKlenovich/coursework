import { Injectable } from '@angular/core';
import { ErrorMain } from '../interfaces/global.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  public static createError(errorMessage: string): ErrorMain {
    return {
      errorMessage: errorMessage,
      error: new Error(errorMessage)
    };
  }
}
