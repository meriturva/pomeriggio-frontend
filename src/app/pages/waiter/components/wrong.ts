import { Component, signal } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { delay, finalize, of, tap } from 'rxjs';

@Component({
    selector: 'app-waiter-wrong',
    imports: [Highlight, HighlightLineNumbers, DialogModule, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Utilizzo dialogs di Primeng</div>

                    <div class="font-semibold text-l mt-2">Component template:</div>
                    <pre>
                        <code [highlight]="templateCode" language="html" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Component code:</div>
                    <pre>
                        <code [highlight]="tsCode" language="ts" lineNumbers></code>
                    </pre>
               </div>
               <div class="card">
                   <p-dialog header="Loading" [modal]="true"  [closable]="false" [visible]="waiterVisible()" class="text-center">
                        <p>Sto caricando tanti dati!</p>
                        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                   </p-dialog>
                   <p-button raised (click)="onLoadFromServiceCorrect()">Load</p-button>
               </div>`
})
export class WrongPage {
    protected waiterVisible = signal(false);

    protected templateCode = `<p-dialog header="Loading" [modal]="true"  [closable]="false" [visible]="waiterVisible()" class="text-center">
    <p>Sto caricando tanti dati!</p>
    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
</p-dialog>
<p-button raised (click)="onLoadFromService()">Load</p-button>
`;

    protected tsCode = `export class MyComponent {
       public onLoadFromService() {
        // Show waiter
        this.waiterVisible.set(true);
        // Simulazione chiamata al backend
        of([1, 2, 3]).pipe(
            delay(2000)
        ).subscribe(() => {
            // Done
            this.waiterVisible.set(false);
        });
    }
}`;

    public onLoadFromService() {
        // Show waiter
        this.waiterVisible.set(true);
        of([1, 2, 3]).pipe(
            delay(2000),
        ).subscribe(() => {
            // Done
            this.waiterVisible.set(false);
        });
    }

    public onLoadFromServiceWithError() {
        // Show waiter
        this.waiterVisible.set(true);
        of([1, 2, 3]).pipe(
            delay(2000),
            tap(() => { throw new Error('Simulated error'); })
        ).subscribe(() => {
            // Done
            this.waiterVisible.set(false);
        });
    }

    public onLoadFromServiceCorrect() {
        // Show waiter
        this.waiterVisible.set(true);
        of([1, 2, 3]).pipe(
            delay(2000),
            tap(() => { throw new Error('Simulated error'); }),
            finalize(() => {
                // Hide waiter
                this.waiterVisible.set(false);
            })
        ).subscribe();
    }
}
