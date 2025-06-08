import { EventEmitter, Injectable } from "@angular/core";
import { Subscriber } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EventsService {
    /**
     * Event to show a waiter dialog.
     */
    public onShowWaiter: EventEmitter<void> = new EventEmitter();

    /**
     * Event to close a waiter dialog.
     */
    public onCloseWaiter: EventEmitter<void> = new EventEmitter();

    /**
     * Event to show a confirmation dialog.
     */
    public onShowConfirmDialogNotWorking: EventEmitter<string | undefined> = new EventEmitter();

    /**
     * Event to show a confirmation dialog.
     * @param message Message to show
     * @param subscriber Subscriber to emit the result
     * @param emitOnReject Emit on reject (default: false)
     */
    public onShowConfirmDialog: EventEmitter<{message: string, subscriber: Subscriber<boolean>, emitOnReject?: boolean}> = new EventEmitter();
}
