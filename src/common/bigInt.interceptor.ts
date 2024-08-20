import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.serializeBigInt(data)),
    );
  }

  private serializeBigInt(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.serializeBigInt(item));
    }

    if (typeof data === 'object' && data !== null) {
      return Object.entries(data).reduce((acc, [key, value]) => {
        if (typeof value === 'bigint') {
          return { ...acc, [key]: value.toString() };
        }
        return { ...acc, [key]: this.serializeBigInt(value) };
      }, {});
    }

    return data;
  }
}