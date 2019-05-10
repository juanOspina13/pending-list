
import { HearingI } from '../hearing/hearingI';
import { PendingHearingComponent } from './pending-hearings.component';

describe('PendingHearingComponent', () => {
    let component: PendingHearingComponent,
        mockSessionService;
    beforeEach(() => {
        mockSessionService = jasmine.createSpyObj("SessionService", ["searchHearings"]);
        component = new PendingHearingComponent(mockSessionService);
    });
    describe("formatPendingListObject method", () => {
        let firstPendingHearing: HearingI;
        beforeEach(() => {
            firstPendingHearing = {
                "reservationId": 1,
                "description": "Juans Trial",
                "courtRoomName": "GTL Court Room",
                "detaineeRoomName": "Juan",
                "handcuffs": true,
                "supervision": true,
                "youth": true,
                "needsInterpreter": true,
                "breachOfBailDVPO": true,
                "countDownTime": 10,
                "statusId": 1,
                "status": "Ready",
                "priority": 1,
                id: 2
            };
        });
        it("should be defined", () => {
            expect(component.formatPendingListObject).toBeDefined();
        });

        it("should return formatted hearings", () => {
            const pendingHearings = [firstPendingHearing];
            const expectedResult = [
                {
                    collapsed: true,
                    hearingObject: firstPendingHearing,
                    hearingObjectDetails: {
                        hearingParticipants: [],
                        additionalInformation: null
                    }
                }
            ];
            const result = component.formatPendingListObject(pendingHearings);
            expect(expectedResult).toEqual(result);
        });
    });
});
