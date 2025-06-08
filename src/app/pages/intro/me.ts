import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-me',
    standalone: true,
    imports: [RouterModule, ButtonModule],
    template: `
        <div class="flex items-center justify-center min-h-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                        <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2">Diego Bonura</h1>
                        <div class="text-surface-600 dark:text-surface-200 mb-8">diego&#64;bonura.dev</div>
                        <a href="https://bonura.dev" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                            <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-exclamation-circle !text-2xl"></i>
                            </span>
                            <span class="ms-6 flex flex-col">
                                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0 block">Full stack developer</span>
                                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Faccio male sia il frontend che il backend!</span>
                            </span>
                        </a>
                        <a href="https://diegobonura.medium.com" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                            <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-external-link !text-2xl"></i>
                            </span>
                            <span class="ms-6 flex flex-col">
                                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Quando ho tempo</span>
                                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Bevo e scrivo su medium (contemporaneamente)</span>
                                https://medium.com/&#64;diegobonura
                            </span>
                        </a>
                        <a href="https://github.com/meriturva/pomeriggio-frontend" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                            <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-github !text-2xl"></i>
                            </span>
                            <span class="ms-6 flex flex-col">
                                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Link repo</span>
                                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">https://github.com/meriturva/pomeriggio-frontend</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`
})
export class MePage {}
