import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
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
}
