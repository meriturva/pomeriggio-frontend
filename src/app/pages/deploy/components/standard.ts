import { Component } from '@angular/core';

@Component({
    selector: 'app-deploy-standard',
    template: `<div class="card">
                    <div class="font-semibold text-xl">Siampo pronti a fare deploy?</div>
                    <p>Eseguiamo il comando <em>ng build</em></p>
                    <p>Otteniamo:</p>
                    <img src="/img/deploy-chunks.png" alt="Chunks" class="m-4">
               </div>

               <div class="card">
                <p>Dopo pochi minuti otteniamo questi errori:</p>
                <img src="/img/sentry-chunk-error.png" alt="Sentry" class="m-4">
               </div>
               `
})
export class StandardPage { }
