import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'ag-grid-enterprise'
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey("")
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
