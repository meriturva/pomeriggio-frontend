import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { concatMap, delay, of } from 'rxjs';
import { BasePage } from '../../base-page';

@Component({
    selector: 'app-confirm-dialog-dry-step-3',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Ma quindi ora posso concatenare gli osservabili?</div>

                    <div class="font-semibold text-l mt-2">Component code:</div>
                    <pre>
                        <code [highlight]="tsCode" language="ts" lineNumbers></code>
                    </pre>

                    <img src="/img/the-universe-tim-and-eric-mind-blown.gif" alt="Mind blown" class="my-4 mx-auto">
               </div>
              <div class="card">
                   <p-button raised (click)="onAskConfirmation()">Ask</p-button>
               </div>`
})
export class DryStep4Page extends BasePage {

    protected tsCode = `
        public onAskConfirmation() {
            this.showConfirmDialog("Are you sure that you want to proceed?").pipe(
                concatMap(() => of([1,2,3]).pipe(
                    delay(1000),
                    this.autoWaiter()
                ))
            ).subscribe((value) => {
                console.log("Result", value);
            });
        }
        `;

    public onAskConfirmation() {
        this.showConfirmDialog("Are you sure that you want to proceed?").pipe(
            concatMap(() => of([1,2,3]).pipe(
                delay(1000),
                this.autoWaiter()
            ))
        ).subscribe((value) => {
            console.log("Result", value);
        });
    }
}
