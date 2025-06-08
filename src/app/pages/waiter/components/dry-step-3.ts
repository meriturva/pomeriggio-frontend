import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { delay, of } from 'rxjs';
import { BasePage } from '../../base-page';

@Component({
    selector: 'app-waiter-dry-step-3',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Definiamo un nuovo operatore rxjs?</div>

                    <div class="font-semibold text-l mt-2">Nuovo operatore:</div>
                    <pre>
                        <code [highlight]="newOperator" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Base page:</div>
                    <pre>
                        <code [highlight]="basePageCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Component code:</div>
                    <pre>
                        <code [highlight]="tsCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Vantaggi:</div>
                    <ul>
                        <li>Utilizzo un operatore rxjs per la logica del waiter</li>
                    </ul>
               </div>
              <div class="card">
                   <p-button raised (click)="onLoadFromService()">Load</p-button>
               </div>`
})
export class DryStep3Page extends BasePage {

    protected newOperator = `/**
         * Utility operator to start with a tap callback before switching to the source observable.
         * This is useful for triggering side effects before the main observable logic.
         *
         * @param callback - The function to call before subscribing to the source observable.
         * @returns An observable that emits the source observable after executing the tap callback.
         */
        export function startWithTap<T>(callback: () => void) {
            return (source: Observable<T>) =>
                // Emit an empty object to trigger the tap callback
                of({}).pipe(
                    tap(callback),
                    // Switch to the original source observable
                    switchMap((o) => source));
        }
    `;

    protected basePageCode = `/**
        * Show automagically the waiter
        * @returns An operator function that can be used in an observable chain to show and hide a waiter dialog.
        */
        public autoWaiter<T>(): MonoTypeOperatorFunction<T> {
            return pipe(
                startWithTap(() => { this.showWaiter(); }),
                finalize(() => { this.closeWaiter() })
            );
        }
        `;

    protected tsCode = `public onLoadFromService() {
            of([1, 2, 3]).pipe(
                delay(2000),
                this.autoWaiter()
            ).subscribe();
        }
        `;

    public onLoadFromService() {
        of([1, 2, 3]).pipe(
            delay(2000),
            this.autoWaiter()
        ).subscribe();
    }
}
