import { DateProvider } from "src/utils/models/date.util";

export class ProductionErrorResponse {
   statusCode: number;
   timeStamp: string = new DateProvider().PHTNow();
   message: string;

   constructor(_statusCode: number, _message: string) {
      this.statusCode = _statusCode;
      this.message = _message;
   }
}

export class DevelopmentErrorResponse {
   statusCode: number;
   timeStamp: string = new DateProvider().PHTNow();
   message: string;
   stackTrace: string | undefined;

   constructor(_statusCode: number, _message: string, _stackTrace: string | undefined) {
      this.statusCode = _statusCode;
      this.message = _message;
      this.stackTrace = _stackTrace;
   }
}