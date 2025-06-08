
import { Routes } from '@angular/router';
import { InfoPage } from './components/info';
import { ExamplePage } from './components/example';
import { ResolverPage } from './components/resolver';

export default [
    { path: 'info', component: InfoPage },
    { path: 'example', component: ExamplePage },
    { path: 'resolver', component: ResolverPage }
] as Routes;
