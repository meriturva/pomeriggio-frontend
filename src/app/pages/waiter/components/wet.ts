import { Component, signal } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-waiter-wet',
    imports: [Highlight, HighlightLineNumbers, DialogModule, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Utilizzo dialog su più pagine</div>

                    <div class="font-semibold text-l mt-2">Component1 template:</div>
                    <pre>
                        <code [highlight]="templateCode1" language="html" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Component1 code:</div>
                    <pre>
                        <code [highlight]="tsCode1" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Component2 template:</div>
                    <pre>
                        <code [highlight]="templateCode2" language="html" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Component2 code:</div>
                    <pre>
                        <code [highlight]="tsCode2" language="ts" lineNumbers></code>
                    </pre>
               </div>
               `
})
export class WetPage {
    protected waiterVisible = signal(false);

    protected templateCode1 = `<p-dialog header="Loading" [modal]="true"  [closable]="false" [visible]="waiterVisible()" class="text-center">
            <p>Sto caricando tanti dati!</p>
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </p-dialog>
        <p-button raised (click)="onLoadFromService()">Load</p-button>
        `;

    protected tsCode1 = `export class MyComponent1 {
        public onLoadFromService() {
            // Show waiter
            this.waiterVisible.set(true);
            of([1, 2, 3]).pipe(
                delay(2000),
                tap(() => {throw new Error('Simulated error');}),
                finalize(() => {
                    // Hide waiter
                    this.waiterVisible.set(false);
                })
            ).subscribe();
        }
    }`;

    protected templateCode2 = `<p-dialog header="Loading" [modal]="true"  [closable]="false" [visible]="waiterVisible()" class="text-center">
            <p>Sto caricando tanti dati!</p>
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </p-dialog>
        <p-button raised (click)="onLoadFromService()">Load</p-button>
        `;

    protected tsCode2 = `export class MyComponent2 {
        public onLoadFromService() {
            // Show waiter
            this.waiterVisible.set(true);
            of([1, 2, 3]).pipe(
                delay(2000),
                tap(() => {throw new Error('Simulated error');}),
                finalize(() => {
                    // Hide waiter
                    this.waiterVisible.set(false);
                })
            ).subscribe();
        }
    }`;
}
