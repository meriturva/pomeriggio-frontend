import { Component, inject } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { delay, finalize, of } from 'rxjs';
import { EventsService } from '../../event.service';

@Component({
    selector: 'app-waiter-dry-step-1',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Utilizzo dialog con event service</div>

                    <div class="font-semibold text-l mt-2">Event service:</div>
                    <pre>
                        <code [highlight]="eventServiceCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">App component template:</div>
                    <pre>
                        <code [highlight]="appTemplateCode" language="html" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">App component code:</div>
                    <pre>
                        <code [highlight]="appComponentCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Component code:</div>
                    <pre>
                        <code [highlight]="tsCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Vantaggi:</div>
                    <ul>
                        <li>Dialog solo su un componente</li>
                        <li>Dialog non legato ad una pagina specifica</li>
                        <li>Non importo il modulo DialogModule in ogni componente</li>
                        <li>Sui test basta mokkare l'event service</li>
                    </ul>
               </div>
              <div class="card">
                   <p-button raised (click)="onLoadFromService()">Load</p-button>
               </div>`
})
export class DryStep1Page {
    private readonly _eventsService = inject(EventsService);

    protected eventServiceCode = `import { EventEmitter, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class EventsService {
    /**
     * Event to show a waiter dialog.
     */
    public onShowWaiter: EventEmitter<void> = new EventEmitter();

    /**
     * Event to close a waiter dialog.
     */
    public onCloseWaiter: EventEmitter<void> = new EventEmitter();
}
`;

    protected appTemplateCode = `<p-dialog header="Loading" [modal]="true"  [closable]="false" [visible]="waiterVisible()" class="text-center">
    <p>Sto caricando tanti dati!</p>
    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
</p-dialog>
<p-confirmdialog />
<router-outlet></router-outlet>
`;

    protected appComponentCode = `private readonly _eventsService = inject(EventsService);
protected waiterVisible = signal(false);

constructor() {
    this._eventsService.onShowWaiter.pipe(takeUntilDestroyed()).subscribe(() => {
        this.waiterVisible.set(true);
    });

    this._eventsService.onCloseWaiter.pipe(takeUntilDestroyed()).subscribe(() => {
        this.waiterVisible.set(false);
    });
}
`;

    protected tsCode = `public onLoadFromService() {
    // Show waiter using the event service
    this._eventsService.onShowWaiter.emit();
    of([1, 2, 3]).pipe(
        delay(2000),
        finalize(() => {
            // Hide waiter using the event service
            this._eventsService.onCloseWaiter.emit();
        })
    ).subscribe();
}
`;

    public onLoadFromService() {
        // Show waiter using the event service
        this._eventsService.onShowWaiter.emit();
        of([1, 2, 3]).pipe(
            delay(2000),
            finalize(() => {
                // Hide waiter using the event service
                this._eventsService.onCloseWaiter.emit();
            })
        ).subscribe();
    }
}
