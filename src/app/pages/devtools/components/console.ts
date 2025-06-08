import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-devtools-console',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Utilizzo di messaggi di console</div>
                    <pre>
                        <code [highlight]="demoCode" language="ts" lineNumbers></code>
                    </pre>
               </div>
               <div class="card">
                    <p-button raised (click)="doSomething()">Do something</p-button>
               </div>`
})
export class ConsolePage {
    protected demoCode = `export class MyClass {
        public doSomething() {
            console.log('Doing something...');
            const largeArray = new Array(1e6).fill(0).map((_, i) => i);
            console.log('Array result', largeArray)
            console.log('Did something...');
        }
}`;

    public doSomething() {
        console.log('Doing something...');
        const largeArray = new Array(1e6).fill(0).map((_, i) => i);
        console.log('Array result', largeArray)
        console.log('Did something...');
    }
}
