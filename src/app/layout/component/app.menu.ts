import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Introduzione',
                items: [
                    { label: 'Me', icon: 'pi pi-fw pi-user', routerLink: ['/intro/me'] }
                ]
            },
            {
                label: 'DevTools', routerLink: ['/devtools'],
                items: [
                    { label: 'Console', icon: 'pi pi-fw pi-align-left', routerLink: ['/devtools/console']},
                    { label: 'Debugger', icon: 'pi pi-fw pi-code', routerLink: ['/devtools/debugger']},
                    { label: 'Devices', icon: 'pi pi-fw pi-mobile', routerLink: ['/devtools/devices']},
                    { label: 'Network', icon: 'pi pi-fw pi-sync', routerLink: ['/devtools/network']},
                ]
            },
            {
                label: 'Waiter', routerLink: ['/waiter'],
                items: [
                    { label: 'Wrong', icon: 'pi pi-fw pi-times', routerLink: ['/waiter/wrong']},
                    { label: 'Wet', icon: 'pi pi-fw pi-twitch', routerLink: ['/waiter/wet']},
                    { label: 'Dry step 1', icon: 'pi pi-fw pi-star-half', routerLink: ['/waiter/dry-step-1']},
                    { label: 'Dry step 2', icon: 'pi pi-fw pi-star', routerLink: ['/waiter/dry-step-2']},
                    { label: 'Dry step 3', icon: 'pi pi-fw pi-star-fill', routerLink: ['/waiter/dry-step-3']},
                    { label: 'Resolver', icon: 'pi pi-fw pi-wave-pulse', routerLink: ['/waiter/resolver']}
                ]
            },
            {
                label: 'Confirm dialog', routerLink: ['/confirm-dialog'],
                items: [
                    { label: 'Wet', icon: 'pi pi-fw pi-twitch', routerLink: ['/confirm-dialog/wet']},
                    { label: 'Dry step 1', icon: 'pi pi-fw pi-star-half', routerLink: ['/confirm-dialog/dry-step-1']},
                    { label: 'Dry step 2', icon: 'pi pi-fw pi-star', routerLink: ['/confirm-dialog/dry-step-2']},
                    { label: 'Dry step 3', icon: 'pi pi-fw pi-star-fill', routerLink: ['/confirm-dialog/dry-step-3']},
                    { label: 'Dry step 4', icon: 'pi pi-fw pi-gift', routerLink: ['/confirm-dialog/dry-step-4']}
                ]
            },
            {
                label: 'Rotte dinamiche', routerLink: ['/dynamic-routes'],
                items: [
                    { label: 'Info', icon: 'pi pi-fw pi-info-circle', routerLink: ['/dynamic-routes/info']},
                    { label: 'Example', icon: 'pi pi-fw pi-sitemap', routerLink: ['/dynamic-routes/example']},
                    { label: 'Resolver', icon: 'pi pi-fw pi-wave-pulse', routerLink: ['/dynamic-routes/resolver']}
                ]
            },
            {
                label: 'Deploy', routerLink: ['/deploy'],
                items: [
                    { label: 'Standard', icon: 'pi pi-fw pi-server', routerLink: ['/deploy/standard']},
                    { label: 'Error handler', icon: 'pi pi-fw pi-cloud', routerLink: ['/deploy/error-handler']},
                    { label: 'Service worker', icon: 'pi pi-fw pi-clock', routerLink: ['/deploy/service-worker']}
                ]
            }
        ];
    }
}
