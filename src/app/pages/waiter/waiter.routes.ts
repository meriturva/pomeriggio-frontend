import { delay, of } from 'rxjs';

import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';

import { WrongPage } from './components/wrong';
import { WetPage } from './components/wet';
import { DryStep1Page } from './components/dry-step-1';
import { DryStep2Page } from './components/dry-step-2';
import { DryStep3Page } from './components/dry-step-3';
import { ResolverPage } from './components/resolver';

const dataResolverFn: ResolveFn<number> = () => of(Math.random()).pipe(delay(3000))

export default [
    { path: 'wrong', component: WrongPage },
    { path: 'wet', component: WetPage },
    { path: 'dry-step-1', component: DryStep1Page },
    { path: 'dry-step-2', component: DryStep2Page },
    { path: 'dry-step-3', component: DryStep3Page },
    { path: 'resolver', component: ResolverPage, resolve: { data: dataResolverFn } },
] as Routes;
