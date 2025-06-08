import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, ResolveStart, Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { EventsService } from './app/pages/event.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
    selector: 'app-root',
    imports: [RouterModule, DialogModule, ConfirmDialog],
    providers: [ConfirmationService],
    template: `
        <p-dialog header="Loading" [modal]="true"  [closable]="false" [visible]="waiterVisible()" class="text-center">
            <p>Sto caricando tanti dati!</p>
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </p-dialog>
        <p-confirmdialog />
        <router-outlet></router-outlet>
        `
})
export class AppComponent {
    private readonly _eventsService = inject(EventsService);
    private readonly _confirmationService = inject(ConfirmationService);
    private readonly _router = inject(Router);

    protected waiterVisible = signal(false);

    constructor() {
        this._eventsService.onShowWaiter.pipe(takeUntilDestroyed()).subscribe(() => {
            this.waiterVisible.set(true);
        });

        this._eventsService.onCloseWaiter.pipe(takeUntilDestroyed()).subscribe(() => {
            this.waiterVisible.set(false);
        });

        this._eventsService.onShowConfirmDialogNotWorking.pipe(takeUntilDestroyed()).subscribe((message) => {
            this._confirmationService.confirm({
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                message: message,
                accept: () => {
                    console.log("Accepted");
                },
                reject: () => {
                    console.log("Rejected");
                }
            })
        });

        this._eventsService.onShowConfirmDialog.pipe(takeUntilDestroyed()).subscribe((options) => {
            this._confirmationService.confirm({
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                message: options.message,
                accept: () => {
                    options.subscriber.next(true);
                    options.subscriber.complete();
                },
                reject: () => {
                    if (options.emitOnReject) {
                        options.subscriber.next(false);
                    }
                    options.subscriber.complete();
                }
            })
        });

        this._router.events.pipe(takeUntilDestroyed()).subscribe((routerEvent) => {
            // Note: https://angular.dev/api/router/ResolveStart
            if (routerEvent instanceof ResolveStart) {
                this._eventsService.onShowWaiter.emit();
            }

            if (routerEvent instanceof NavigationEnd ||
                routerEvent instanceof NavigationCancel ||
                routerEvent instanceof NavigationError) {
                this._eventsService.onCloseWaiter.emit();
            }
        });
    }
}
