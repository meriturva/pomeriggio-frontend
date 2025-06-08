import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { BasePage } from '../../base-page';

@Component({
    selector: 'app-confirm-dialog-dry-step-3',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Definiamo un nuovo osservabile rxjs?</div>
                    <div class="font-semibold text-l mt-2">Base page:</div>
                    <pre>
                        <code [highlight]="basePageCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">App component:</div>
                    <pre>
                        <code [highlight]="appComponentCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Component code:</div>
                    <pre>
                        <code [highlight]="tsCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Vantaggi:</div>
                    <ul>
                        <li>Utilizzo un semplice osservabile rxjs per mostrare la richiesta di conferma</li>
                    </ul>
               </div>
              <div class="card">
                   <p-button raised (click)="onAskConfirmation()">Ask</p-button>
               </div>`
})
export class DryStep3Page extends BasePage {

    protected basePageCode = `/**
         * Show confirmation dialog
         * @param message Message to show
         * @returns Observable of boolean (true accepted - false rejected)
         */
        public showConfirmDialog(message: string, emitOnReject?: boolean): Observable<boolean> {
            return new Observable<boolean>((subscriber) => {
                this._eventsService.onShowConfirmDialog.emit({ message, subscriber, emitOnReject })
            });
        }
        `;

    protected appComponentCode = `private readonly _eventsService = inject(EventsService);

        constructor() {
            this._eventsService.onShowConfirmDialog.pipe(takeUntilDestroyed()).subscribe((options) => {
                this._confirmationService.confirm({
                    header: 'a',
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
        }
        `;

    protected tsCode = `public onAskConfirmation() {
            this.showConfirmDialog("Are you sure that you want to proceed?").subscribe((value) => {
                console.log("User response:", value);
            });
        }
        `;

    public onAskConfirmation() {
        this.showConfirmDialog("Are you sure that you want to proceed?").subscribe((value) => {
            console.log("User response:", value);
            alert(value);
        });
    }
}
