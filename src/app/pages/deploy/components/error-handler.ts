import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-deploy-standard',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                   <div class="font-semibold text-xl">Utilizzo di un semplice error handler</div>

                    <div class="font-semibold text-l mt-2">Error handler:</div>
                    <pre>
                        <code [highlight]="errorHandlerCode" language="ts" lineNumbers></code>
                    </pre>
                    </div>
                    <div class="card">
                    <p-button raised (click)="onSimulateError()">Simulate error</p-button>
               </div>`
})
export class ErrorHandlerPage {
    protected errorHandlerCode = `@Injectable()
export class ChunkLoadErrorHandler implements ErrorHandler {

    public handleError(error: any): void {
        // Check if is a chunk error
        const chunkFailedMessage = /Loading chunk .+failed/;
        const dynamicallyImportError = /Failed to fetch dynamically imported module/;

        if (error?.message && (chunkFailedMessage.test(error.message) || dynamicallyImportError.test(error.message))) {
            if (confirm("Una nuova versione dell'applicazione è disponibile. Vuoi caricarla?")) {
                window.location.reload();
            }
        }
    }
}`;

    public onSimulateError() {
        throw new Error('Loading chunk 123 failed');
    }
}
