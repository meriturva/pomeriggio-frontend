
import { Routes } from '@angular/router';

import { DryStep1Page } from './components/dry-step-1';
import { DryStep2Page } from './components/dry-step-2';
import { DryStep3Page } from './components/dry-step-3';
import { DryStep4Page } from './components/dry-step-4';
import { WetPage } from './components/wet';

export default [
    { path: 'wet', component: WetPage },
    { path: 'dry-step-1', component: DryStep1Page },
    { path: 'dry-step-2', component: DryStep2Page },
    { path: 'dry-step-3', component: DryStep3Page },
    { path: 'dry-step-4', component: DryStep4Page }
] as Routes;
