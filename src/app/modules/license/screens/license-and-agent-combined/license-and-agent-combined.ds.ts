import { Injectable } from '@angular/core';
import { LicensePlaceholderDataSource } from '../license-placeholder.ds';

@Injectable({
  providedIn: 'root',
})
export class LicenseAndAgentCombinedDataSource extends LicensePlaceholderDataSource {}
