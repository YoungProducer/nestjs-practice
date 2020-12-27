import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { fetchToCurl } from 'src/lib/request-to-curl';
import { validateError, getLog, logName, closeWrap } from './helpers';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const log = (data: string | Uint8Array) => process.stdout.write(data);
        const error = (data: string | Uint8Array) => process.stderr.write(data);

        const ctx = context.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        const curlString = fetchToCurl({
            url: 'http://localhost:3000' + req.originalUrl,
            body: req.body,
            headers: req.headers as any,
            method: req.method as any,
        });

        const now = Date.now();

        return next.handle().pipe(
            tap(() =>
                log(
                    getLog({
                        start: now,
                        executionTime: Date.now() - now,
                        statusCode: res.statusCode,
                        curlString,
                    }),
                ),
            ),
            catchError(
                (err: any): Observable<boolean | void> =>
                    of(
                        error(
                            getLog({
                                error: true,
                                start: now,
                                executionTime: Date.now() - now,
                                statusCode: err.status || 500,
                                curlString,
                                noCloseWrap: true,
                            }),
                        ),
                        error(logName('Trace: ')),
                        validateError(err) ? console.log(err) : undefined,
                        error(closeWrap),
                    ),
            ),
        );
    }
}
