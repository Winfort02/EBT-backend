import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { DEFAULT, KEYS } from "src/constants";
import { DevelopmentErrorResponse, ProductionErrorResponse } from "src/models/error-response.model";

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {

   private readonly logger = new Logger(GlobalExceptionFilter.name);

   constructor(private readonly config: ConfigService) {}

   catch(exception: HttpException, host: ArgumentsHost) {
      const context = host.switchToHttp();
      const response = context.getResponse<Response>();
      const status = exception.getStatus();
      const isProduction = this.config.get<string>(KEYS.MODE) === DEFAULT.PRODUCTION_MODE;
      const error = isProduction ? 
                  new ProductionErrorResponse(status, exception.message) : 
                  new DevelopmentErrorResponse(status, exception.message, exception.stack);
      this.logger.error(`Exception: ${exception.message}, status: ${status}`);
      response.status(status).json(error);
   }
}