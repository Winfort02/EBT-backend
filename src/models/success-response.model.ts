import { DateProvider } from "src/utils/models/date.util";

export class SuccessHttpResponse<TModel> {
   data: TModel;
   timeStamp: string = new DateProvider().PHTNow();
   message: string;

   constructor(_data: TModel, _message: string) {
      this.data = _data;
      this.message = _message;
   }
}