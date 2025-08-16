import { HttpException } from "@nestjs/common";

export class CommonHttpException extends HttpException {
   constructor(_message: string, _code: number) {
      super(_message, _code);
   }
}