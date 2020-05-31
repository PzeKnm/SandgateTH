import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';


export class MyValidationError extends Error {

  public extra: string = 'something extra';

  constructor(message, extra) {
    super(message);

    Object.setPrototypeOf(this, MyValidationError.prototype);
    this.message     = message
    this.name = this.constructor.name;
    this.extra = extra;
  }
}




export class MyAssertionError extends Error  {

  public message: string;
  constructor(message) {   
    super(message);
    Object.setPrototypeOf(this, MyAssertionError.prototype);     
  }
}




export function getDebugContext(error: Error): any {
  return (error as any)['ngDebugContext']
}


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  handleError(err: any) {

    console.error(err.name);    
    console.error(err.message); 

    if (err instanceof MyAssertionError) {
      console.warn(err.message);
    }

    if (err instanceof HttpErrorResponse) {
      console.log('Its a HttpErrorResponse Error');
    }  

    if (err instanceof Error) {
      console.log('Its a Error Error');
    } 




    console.error("%O", err)

    // your custom error handling logic  
    if (err instanceof MyValidationError) {
      console.log('Its a Validation Error');
    }

    if (err instanceof SyntaxError) {
      console.log('Its a Syntax Error');
    }

  




  }
}