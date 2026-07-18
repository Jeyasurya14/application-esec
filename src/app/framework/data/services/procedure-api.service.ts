import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { enviroment } from '../../../../environments/environment';

export interface ProcedureResponse<T> {
  status: string;
  message: T[];
}

@Injectable({
  providedIn: 'root',
})
export class ProcedureApiService {
  readonly http = inject(HttpClient);

  execute<T>(sql: string): Observable<T[]> {
    return this.http
      .post<ProcedureResponse<T>>(`${enviroment.api.baseUrl}${enviroment.api.endpoint}`, { sql })
      .pipe(map((response) => response.message));
  }
}
