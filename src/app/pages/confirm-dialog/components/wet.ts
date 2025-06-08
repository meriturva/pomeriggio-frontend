import { Component, inject, signal } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
    selector: 'app-confirm-dialog-wet',
    imports: [Highlight, HighlightLineNumbers, ConfirmDialog, ButtonModule],
    providers: [ConfirmationService],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Utilizzo confirm dialog su più pagine</div>

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
               <div class="card">
                   <p-confirmdialog />
                   <p-button raised (click)="onAskConfirmation()">Ask</p-button>
               </div>
               `
})
export class WetPage {
    private _confirmationService = inject(ConfirmationService);

    protected templateCode1 = `<p-confirmdialog />`;

    protected tsCode1 = `export class MyComponent1 {
        this._confirmationService.confirm({
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            message: 'Are you sure that you want to proceed?',
            accept: () => {
                console.log("Accepted");
            },
            reject: () => {
                console.log("Rejected");
            }
        });
    }`;

    protected templateCode2 = `<p-confirmdialog />`;

    protected tsCode2 = `export class MyComponent2 {
       this._confirmationService.confirm({
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            message: 'Are you sure that you want to proceed?',
            accept: () => {
                console.log("Accepted");
            },
            reject: () => {
                console.log("Rejected");
            }
        });
    }`;

    public onAskConfirmation() {
        this._confirmationService.confirm({
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            message: 'Are you sure that you want to proceed?',
            accept: () => {
                console.log("Accepted");
            },
            reject: () => {
                console.log("Rejected");
            }
        });
    }
}
