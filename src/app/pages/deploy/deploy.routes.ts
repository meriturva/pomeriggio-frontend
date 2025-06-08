
import { Routes } from '@angular/router';
import { StandardPage } from './components/standard';
import { ErrorHandlerPage } from './components/error-handler';

export default [
    { path: 'standard', component: StandardPage },
    { path: 'error-handler', component: ErrorHandlerPage }
] as Routes;
