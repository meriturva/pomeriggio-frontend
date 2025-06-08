import { Component, inject } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { delay, finalize, of } from 'rxjs';
import { EventsService } from '../../event.service';

@Component({
    selector: 'app-confirm-dialog-dry-step-1',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Utilizzo confirmation dialog con event service</div>

                    <div class="font-semibold text-l mt-2">Event service:</div>
                    <pre>
                        <code [highlight]="eventServiceCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">App component:</div>
                    <pre>
                        <code [highlight]="appComponentCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Component code:</div>
                    <pre>
                        <code [highlight]="tsCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Problema:</div>
                    Ma come leggo la risposta dell'utente?
               </div>
              <div class="card">
                   <p-button raised (click)="onAskConfirmation()">Ask</p-button>
               </div>`
})
export class DryStep1Page {
    private readonly _eventsService = inject(EventsService);

    protected eventServiceCode = `import { EventEmitter, Injectable } from "@angular/core";

        @Injectable({ providedIn: 'root' })
        export class EventsService {
            /**
             * Event to show a confirmation dialog.
             */
            public onShowConfirmDialogNotWorking: EventEmitter<string | undefined> = new EventEmitter();
        }
        `;

    protected appComponentCode = `private readonly _eventsService = inject(EventsService);

        constructor() {
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
        }
        `;

    protected tsCode = `public onAskConfirmation() {
            // Show confirmation dialog using the event service
            this._eventsService.onShowConfirmDialogNotWorking.emit("Are you sure that you want to proceed?");
        }
        `;

    public onAskConfirmation() {
        // Show confirmation dialog using the event service
        this._eventsService.onShowConfirmDialogNotWorking.emit("Are you sure that you want to proceed?");
    }
}
