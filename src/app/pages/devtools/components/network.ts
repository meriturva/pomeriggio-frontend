import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-devtools-network',
    imports: [ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Ripetere le chiamate</div>
                    <p>Vi è mai capitato di dover rifare tutto un flusso di UI per ripetere una chiamata verso il backend?</p>
                    <p-button raised (click)="callBackend()">Call backend</p-button>
               </div>
               <div class="card">
                    <div class="font-semibold text-xl">Comando da devtool - Replay XHR</div>
                    <p>Solo per chiamate XHR (XMLHttpRequest), non per fetch</p>
                    <p>
                        <img src="/img/replay-xhr.png" alt="Replay XHR" class="m-4">
                    </p>
               </div>

               <div class="card">
                    <div class="font-semibold text-xl">Comando copy e ripetizione con Postman</div>
                    <p>
                        <img src="/img/copy-network.png" alt="Copy" class="m-4">
                    </p>
                    <p>
                        <img src="/img/paste-postman.png" alt="Paste" class="m-4">
                    </p>
               </div>`
})
export class NetworkPage {
    private _httpClient = inject(HttpClient);

    public callBackend() {
        this._httpClient.get('https://jsonplaceholder.typicode.com/posts/1').subscribe();
    }
}
