import { ArgumentsHost, Catch, ConflictException, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const driverError = exception.driverError;

    if (typeof driverError === 'object' && driverError !== null && 'code' in driverError) {
      switch (driverError.code) {
        case '23505':
          throw new ConflictException('Resource already exists.');

        case '23503':
          response.status(400).json({
            statusCode: 400,
            message: 'Invalid relation.'
          });
          return;

        case '23502':
          response.status(400).json({
            statusCode: 400,
            message: 'Required field missing.'
          });
          return;
      }
    }

    throw exception;
  }
}
