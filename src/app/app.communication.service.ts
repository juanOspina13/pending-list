import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppActionsCommunicationService {

    private performingAction = new Subject<Object>();
    private actionFinished = new Subject<Object>();
    private dataReloaded = new Subject<Object>();

    CC_PERFORMING_ACTION = "performingAction";
    CC_ACTION_PERFORMED = "actionPerformed";
    CC_DATA_RELOADED = "dataReloaded";

    performingAction$ = this.performingAction.asObservable();
    actionFinished$ = this.actionFinished.asObservable();
    dataReloaded$ = this.dataReloaded.asObservable();

    announcePerformingAction(action: string, component: string, objectId: number) {
        this.performingAction.next({ action: action, component: component, objectId: objectId });
    }

    announceActionPerformed(action: string, component: string, objectId: number) {
        this.actionFinished.next({ action: action, component: component, objectId: objectId });
    }

    announceDataReloaded(confirmationParameters: Object) {
        this.dataReloaded.next(confirmationParameters);
    }
}
