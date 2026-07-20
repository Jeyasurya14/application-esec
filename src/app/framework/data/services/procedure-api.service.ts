import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface ProcedureResponse<T> {
  status: string;
  message: unknown;
}

function normalizeProcedureRows<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    if (payload.length > 0 && Array.isArray(payload[0])) {
      return payload[0] as T[];
    }
    return payload as T[];
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    return normalizeProcedureRows<T>(record['rows'] ?? record['data'] ?? record['message']);
  }

  return [];
}

@Injectable({
  providedIn: 'root',
})
export class ProcedureApiService {
  readonly http = inject(HttpClient);

  execute<T>(sql: string): Observable<T[]> {
    return this.http
      .post<ProcedureResponse<T>>(`${environment.api.baseUrl}${environment.api.endpoint}`, { sql })
      .pipe(map((response) => normalizeProcedureRows<T>(response.message)));
  }
}

