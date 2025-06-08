import { Directive, inject } from '@angular/core';
import { EventsService } from './event.service';
import { finalize, MonoTypeOperatorFunction, Observable, of, pipe, switchMap, tap } from 'rxjs';

/**
 * Utility operator to start with a tap callback before switching to the source observable.
 * This is useful for triggering side effects before the main observable logic.
 *
 * @param callback - The function to call before subscribing to the source observable.
 * @returns An observable that emits the source observable after executing the tap callback.
 */
export function startWithTap<T>(callback: () => void) {
    return (source: Observable<T>) =>
        // Emit an empty object to trigger the tap callback
        of({}).pipe(
            tap(callback),
            // Switch to the original source observable
            switchMap((o) => source));
}

@Directive({
    selector: 'app-base-page'
})
export abstract class BasePage {
    private readonly _eventsService = inject(EventsService);

    protected showWaiter() {
        console.log('Showing waiter...');
        this._eventsService.onShowWaiter.emit();
    }

    protected closeWaiter() {
        console.log('Closing waiter...');
        this._eventsService.onCloseWaiter.emit();
    }

    /**
    * Show automagically the waiter
    * @returns An operator function that can be used in an observable chain to show and hide a waiter dialog.
    */
    public autoWaiter<T>(): MonoTypeOperatorFunction<T> {
        return pipe(
            startWithTap(() => { this.showWaiter(); }),
            finalize(() => { this.closeWaiter() })
        );
    }

    /**
     * Show confirmation dialog
     */
    public showConfirmDialogNotWorking(message: string) {
        this._eventsService.onShowConfirmDialogNotWorking.emit(message)
    }

    /**
     * Show confirmation dialog
     * @param message Message to show
     * @returns Observable of boolean (true accepted - false rejected)
     */
    public showConfirmDialog(message: string, emitOnReject?: boolean): Observable<boolean> {
        return new Observable<boolean>((subscriber) => {
            this._eventsService.onShowConfirmDialog.emit({ message, subscriber, emitOnReject })
        });
    }
}
