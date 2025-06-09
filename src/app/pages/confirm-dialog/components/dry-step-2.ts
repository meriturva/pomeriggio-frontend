import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { BasePage } from '../../base-page';

@Component({
    selector: 'app-confirm-dialog-dry-step-2',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Utilizzo di una base page</div>

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
                        <li>Event service nascosto dalla base page</li>
                        <li>Grazie ad inject non tocco la firma del costruttore della pagina</li>
                        <li>Sui test basta mokkare l'event service</li>
                    </ul>

                    <div class="font-semibold text-l mt-2">Problema:</div>
                    Ma come leggo la risposta dell'utente?
               </div>
              <div class="card">
                   <p-button raised (click)="onAskConfirmation()">Ask</p-button>
               </div>`
})
export class DryStep2Page extends BasePage {

    protected basePageCode = `@Directive({
    selector: 'app-base-page'
})
export class BasePage {
    private readonly _eventsService = inject(EventsService);

    /**
     * Show confirmation dialog
     */
    public showConfirmDialogNotWorking(message: string) {
        this._eventsService.onShowConfirmDialogNotWorking.emit(message)
    }
}
`;

    protected tsCode = `public onAskConfirmation() {
    this.showConfirmDialogNotWorking("Are you sure that you want to proceed?");
}
`;

    public onAskConfirmation() {
        this.showConfirmDialogNotWorking("Are you sure that you want to proceed?");
    }
}
