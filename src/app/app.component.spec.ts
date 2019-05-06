import { AppComponent } from './app.component';
import { Session } from './session/session';
import { of } from 'rxjs';

describe('AppComponent', () => {
    const SESSION_ID = 1,
        SESSION_NAME = "Juan Pexip",
        NOW_DATE = new Date(),
        VALID_SELECTED_SESSION_ID = "1";
    let appComponent: AppComponent,
        mockSessionService,
        mockAppActionsCommunicationService,
        mockSpinner,
        mockNativeElement,
        mockElementRef,
        mockUtil,
        session: Session;

    describe("assignSessionId method", () => {
        beforeEach(() => {
            mockSessionService = jasmine.createSpyObj("SessionService", ["getSessions", "getSession", "setLocalSession"]);

            mockAppActionsCommunicationService = jasmine.createSpyObj("AppActionsCommunicationService", [
                "announcePerformingAction",
                "announceActionPerformed",
                "unsubscribeActionFinished"
            ]);
            mockAppActionsCommunicationService["dataReloaded$"] = of({});
            mockAppActionsCommunicationService["performingAction$"] = of({});
            mockAppActionsCommunicationService["actionFinished$"] = of({});

            mockSpinner = jasmine.createSpyObj("Spinner", ["hide", "show"]);
            mockNativeElement = jasmine.createSpyObj("NativeElement", ["getAttribute"]);
            mockElementRef = jasmine.createSpyObj("ElementRef", ["get"]);
            mockUtil = jasmine.createSpyObj("Util", ["updateSession"]);
            mockElementRef["nativeElement"] = mockNativeElement;
            mockNativeElement.getAttribute.and.returnValue(VALID_SELECTED_SESSION_ID);
            appComponent = new AppComponent(
                mockSessionService,
                mockSpinner,
                mockElementRef,
                mockAppActionsCommunicationService
            );
            session = {
                id: SESSION_ID,
                name: SESSION_NAME,
                startTime: NOW_DATE,
                endTime: NOW_DATE,
                conferences: []
            };

            appComponent.util = mockUtil;
        });

        it("should be defined", () => {
            expect(appComponent.assignSelectedSessionId).toBeDefined();
        });

        it("should assign the sessionId if the value is greater than 0 ", () => {
            appComponent.selectedSessionId = null;

            appComponent.assignSelectedSessionId(VALID_SELECTED_SESSION_ID);

            expect(appComponent.selectedSessionId).toBe(VALID_SELECTED_SESSION_ID);
        });

        it("should assign null if the value is not a number", () => {
            let invalidSessionIdValue = "this";
            appComponent.selectedSessionId = null;

            appComponent.assignSelectedSessionId(invalidSessionIdValue);

            expect(appComponent.selectedSessionId).toBe(null);
        });

        it("should assign null if the value is zero", () => {
            let invalidSessionIdValue = "0";
            appComponent.selectedSessionId = null;

            appComponent.assignSelectedSessionId(invalidSessionIdValue);

            expect(appComponent.selectedSessionId).toBe(null);
        });

        it("should assign null if the value is a negative number", () => {
            let invalidSessionIdValue = "-1";
            appComponent.selectedSessionId = null;

            appComponent.assignSelectedSessionId(invalidSessionIdValue);

            expect(appComponent.selectedSessionId).toBe(null);
        });

        it("should assign null if the value is a negative string", () => {
            let invalidSessionIdValue = "-1";

            appComponent.selectedSessionId = null;

            appComponent.assignSelectedSessionId(invalidSessionIdValue);

            expect(appComponent.selectedSessionId).toBe(null);
        });

        it("should return the new value", () => {
            appComponent.selectedSessionId = null;

            expect(appComponent.assignSelectedSessionId(VALID_SELECTED_SESSION_ID)).toBe(VALID_SELECTED_SESSION_ID);
        });
    });

    describe("getDateTimeFormat method", () => {
        it("should be defined", () => {
            expect(appComponent.getDateTimeFormat).toBeDefined();
        });

        it("should return dateFormat if a valid value is assigned", () => {
            let dateFormat = "YY-MM-DD";

            appComponent.dateFormat = dateFormat;

            expect(appComponent.getDateTimeFormat()).toBe(dateFormat);
        });

        it("should return short if dateFormat is null", () => {
            appComponent.dateFormat = null;

            expect(appComponent.getDateTimeFormat()).toBe("short");
        });
    });

    describe("updateSessionInternal method", () => {
        it("should be defined", () => {
            expect(appComponent.updateSessionInternal).toBeDefined();
        });

        it("should set session to null if the new session is null", () => {
            appComponent.selectedSession = session;

            appComponent.updateSessionInternal(null);

            expect(appComponent.selectedSession).toBe(null);
        });

        it("should not call updateSession if  selectedSession is null", () => {
            appComponent.selectedSession = null;

            appComponent.updateSessionInternal(session);

            expect(mockUtil.updateSession).not.toHaveBeenCalled();
        });

        it("should set session to the new value if selectedSession is null", () => {
            appComponent.selectedSession = null;

            appComponent.updateSessionInternal(session);

            expect(appComponent.selectedSession).toBe(session);
        });

        it("should not call updateSession if the new session is null", () => {
            appComponent.selectedSession = session;

            appComponent.updateSessionInternal(null);

            expect(mockUtil.updateSession).not.toHaveBeenCalled();
        });

        it("should call updateSession  with expected parameters if the new session is valid", () => {
            appComponent.selectedSession = session;

            appComponent.updateSessionInternal(session);

            expect(mockUtil.updateSession).toHaveBeenCalled();
        });
    });

    describe("refreshData method", () => {
        beforeEach(() => {
            mockSessionService.getSession.and.returnValue(of({}));
        });

        it("should be defined", () => {
            expect(appComponent.refreshData).toBeDefined();
        });

        it("should call getSessions from sessionService", () => {
            mockSessionService.getSessions.and.returnValue(of({ sessions: [] }));
            appComponent.selectedSessionId = "-1";
            appComponent.refreshData();

            expect(mockSessionService.getSessions).toHaveBeenCalled();
        });

        it("should not call getSession from sessionService if the selectedSessionId is not valid", () => {
            mockSessionService.getSessions.and.returnValue(of({ sessions: [] }));
            appComponent.selectedSessionId = "-1";
            appComponent.refreshData();

            expect(mockSessionService.getSession).not.toHaveBeenCalled();
        });

        it("should not call getSession from sessionService if the selectedSessionId is not valid", () => {
            mockSessionService.getSessions.and.returnValue(of({ sessions: [] }));
            appComponent.selectedSessionId = "-1";
            appComponent.refreshData();

            expect(mockSessionService.getSession).not.toHaveBeenCalled();
        });

        it("should call getSession from sessionService if the selectedSessionId is valid", () => {
            mockSessionService.getSessions.and.returnValue(of({ sessions: [session] }));
            appComponent.selectedSessionId = "10";
            appComponent.refreshData();

            expect(mockSessionService.getSession).toHaveBeenCalled();
        });


        it("should call hide from mockSpinner if the selectedSessionId is not valid", () => {
            mockSessionService.getSessions.and.returnValue(of({ sessions: [session] }));
            appComponent.selectedSessionId = "-1";
            appComponent.refreshData();

            expect(mockSpinner.hide).toHaveBeenCalled();
        });
    });

    describe("ngOnInit method", () => {
        beforeEach(() => {
            spyOn(appComponent, "refreshData");
        });

        it("should be defined", () => {
            expect(appComponent.ngOnInit).toBeDefined();
        });

        it("should call show from mockSpinner", () => {
            appComponent.ngOnInit();

            expect(mockSpinner.show).toHaveBeenCalled();
        });

        it("should call refreshData", () => {
            appComponent.ngOnInit();

            expect(appComponent.refreshData).toHaveBeenCalled();
        });
    });

    describe("onSelectSession method", () => {
        beforeEach(() => {
            spyOn(appComponent, "refreshData");
        });

        it("should be defined", () => {
            expect(appComponent.onSelectSession).toBeDefined();
        });

        it("should set selectedSession to null", () => {
            appComponent.selectedSession = session;

            appComponent.onSelectSession();

            expect(appComponent.selectedSession).toBeNull();
        });


        it("should call refreshData", () => {
            appComponent.selectedSession = session;

            appComponent.onSelectSession();

            expect(appComponent.refreshData).toHaveBeenCalled();
        });
    });
});
