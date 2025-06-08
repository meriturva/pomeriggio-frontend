import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <span>Angular dalla A a RxJs</span>
            </a>
        </div>
        <div class="layout-topbar-actions">
            Diego Bonura
        </div>
    </div>`
})
export class AppTopbar {
    protected layoutService = inject(LayoutService);
}
