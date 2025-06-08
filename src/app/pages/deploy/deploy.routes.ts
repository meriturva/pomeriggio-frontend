
import { Routes } from '@angular/router';
import { StandardPage } from './components/standard';
import { ErrorHandlerPage } from './components/error-handler';
import { ServiceWorkerPage } from './components/service-worker';

export default [
    { path: 'standard', component: StandardPage },
    { path: 'error-handler', component: ErrorHandlerPage },
    { path: 'service-worker', component: ServiceWorkerPage }
] as Routes;
