import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', redirectTo: '/intro/me', pathMatch: 'full' },
            { path: 'intro', loadChildren: () => import('./app/pages/intro/intro.routes') },
            { path: 'devtools', loadChildren: () => import('./app/pages/devtools/devtools.routes') },
            { path: 'waiter', loadChildren: () => import('./app/pages/waiter/waiter.routes') },
            { path: 'confirm-dialog', loadChildren: () => import('./app/pages/confirm-dialog/confirm-dialog.routes') },
            { path: 'dynamic-routes', loadChildren: () => import('./app/pages/dynamic-routes/dynamic-routes.routes') },
            { path: 'deploy', loadChildren: () => import('./app/pages/deploy/deploy.routes') }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
