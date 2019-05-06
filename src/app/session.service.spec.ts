import { SessionService } from './session.service';
import { Conference } from './conference/conference';

describe('SessionService', () => {
  const RESERVATION_ID = 46358,
    CONFERENCE_ID = 262127,
    TARGET_CONFERENCE_ID = 262127,
    HEARING_ID = 28,
    TARGET_HEARING_ID = 29,
    MESSAGE_ID = 30,
    ROOM_ID = 9225,
    PARTY_NAME = "",
    PARTICIPANT_ID = 50,
    SESSIONS_URL = '../bridgeControl.do',
    CC_CONNECT = 'connectRoom',
    CC_DISCONNECT = 'disconnectRoom',
    CC_LOCK = 'lockRoom',
    CC_UNLOCK = 'unlockRoom',
    CC_ADD_ROOM = 'addRoom',
    CC_REMOVE_ROOM = 'removeRoom',
    CC_ASSIGN_TO_HEARING = 'assignToHearing',
    CC_COMPLETE_HEARING = 'completeHearing',
    CC_CRACKING_HEARING = 'cancelHearing',
    CC_ADJOURN_HEARING = "adjournHearing",
    CC_CHANGE_PARTICIPANT_STATUS = 'changeParticipantStatus',
    CC_GET_ROOMS = "roomList";

  let service: SessionService,
    mockHttp;
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('http', ['post']);
    service = new SessionService(mockHttp);
  });


  describe('lockHearing method', () => {
    it('should be defined', () => {
      expect(service.lockHearing).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      let expectedParameters = {
        action: CC_LOCK,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        hearingId: HEARING_ID,
        partyName: PARTY_NAME
      };

      service.lockHearing(RESERVATION_ID, CONFERENCE_ID, HEARING_ID, ROOM_ID, PARTY_NAME);

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
  });

  describe('unlockHearing method', () => {
    it('should be defined', () => {
      expect(service.unlockHearing).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      let expectedParameters = {
        action: CC_UNLOCK,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        hearingId: HEARING_ID,
        partyName: PARTY_NAME
      };

      service.unlockHearing(RESERVATION_ID, CONFERENCE_ID, HEARING_ID, ROOM_ID, PARTY_NAME);

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
  });

  describe('conferenceControl method', () => {
    it('should be defined', () => {
      expect(service.conferenceControl).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      let expectedParameters = {
        action: CC_LOCK,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        hearingId: HEARING_ID,
        roomId: ROOM_ID,
        partyName: PARTY_NAME,
        participantId: PARTICIPANT_ID
      };

      service.conferenceControl(CC_LOCK, RESERVATION_ID, CONFERENCE_ID, HEARING_ID, ROOM_ID, PARTY_NAME, PARTICIPANT_ID);

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
  });

  describe('removeHearing method', () => {
    it('should be defined', () => {
      expect(service.removeHearing).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      let expectedParameters = {
        action: CC_REMOVE_ROOM,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        hearingId: HEARING_ID
      };

      service.removeHearing(RESERVATION_ID, CONFERENCE_ID, HEARING_ID);

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
  });

  describe('connectParticipant method', () => {
    beforeEach(() => {
      spyOn(service, "conferenceControl");
    });
    it('should be defined', () => {
      expect(service.connectParticipant).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      service.connectParticipant(RESERVATION_ID, CONFERENCE_ID, HEARING_ID, ROOM_ID, PARTY_NAME, PARTICIPANT_ID);

      expect(service.conferenceControl).toHaveBeenCalledWith(
        CC_CONNECT,
        RESERVATION_ID,
        CONFERENCE_ID,
        HEARING_ID,
        ROOM_ID,
        PARTY_NAME,
        PARTICIPANT_ID
      );
    });
  });

  describe('disconnectParticipant method', () => {
    beforeEach(() => {
      spyOn(service, "conferenceControl");
    });
    it('should be defined', () => {
      expect(service.disconnectParticipant).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      service.disconnectParticipant(RESERVATION_ID, CONFERENCE_ID, HEARING_ID, ROOM_ID, PARTY_NAME, PARTICIPANT_ID);

      expect(service.conferenceControl).toHaveBeenCalledWith(
        CC_DISCONNECT,
        RESERVATION_ID,
        CONFERENCE_ID,
        HEARING_ID,
        ROOM_ID,
        PARTY_NAME,
        PARTICIPANT_ID
      );
    });
  });

  describe("getSessions method", () => {
    it('should be defined', () => {
      expect(service.getSessions).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      let url = "../bridgeControl.do";
      let action = "sessionsForToday";

      service.getSessions();

      expect(mockHttp.post).toHaveBeenCalledWith(url, { action: action });
    });
  });

  describe("getSession method", () => {
    it('should be defined', () => {
      expect(service.getSession).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      let url = "../bridgeControl.do";

      let action = "sessionStatusV2";

      service.getSession(RESERVATION_ID);

      expect(mockHttp.post).toHaveBeenCalledWith(url, {
        action: action,
        reservationId: RESERVATION_ID
      });
    });
  });

  describe("moveRoomToConference method", () => {
    it('should be defined', () => {
      expect(service.moveRoomToConference).toBeDefined();
    });

    it('should call mockHttp  with hearingId in -1 if a room has been assigned', () => {
      let url = "../bridgeControl.do";

      let action = "moveRoomToOtherConference";

      service.moveRoomToConference(
        RESERVATION_ID,
        CONFERENCE_ID,
        TARGET_CONFERENCE_ID,
        HEARING_ID,
        ROOM_ID,
        PARTY_NAME,
        PARTICIPANT_ID
      );

      expect(mockHttp.post).toHaveBeenCalledWith(url, {
        action: action,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        target: TARGET_CONFERENCE_ID,
        hearingId: -1,
        roomId: ROOM_ID,
        partyName: PARTY_NAME,
        participantId: PARTICIPANT_ID
      });
    });

    it('should call mockHttp  with hearingId value 1 if a room has not been assigned', () => {
      let url = "../bridgeControl.do";

      let action = "moveRoomToOtherConference";

      service.moveRoomToConference(
        RESERVATION_ID,
        CONFERENCE_ID,
        TARGET_CONFERENCE_ID,
        HEARING_ID,
        -1,
        PARTY_NAME,
        PARTICIPANT_ID
      );

      expect(mockHttp.post).toHaveBeenCalledWith(url, {
        action: action,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        target: TARGET_CONFERENCE_ID,
        hearingId: HEARING_ID,
        roomId: -1,
        partyName: PARTY_NAME,
        participantId: PARTICIPANT_ID
      });
    });
  });

  describe("addRoomToConference method", () => {
    it("should be defined", () => {
      expect(service.addRoomToConference).toBeDefined();
    });

    it("should call post with expected parameters", () => {
      let expectedParameters = {
        action: CC_ADD_ROOM,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        hearingId: HEARING_ID,
        roomId: ROOM_ID,
        partyName: ''
      };

      service.addRoomToConference(
        RESERVATION_ID,
        CONFERENCE_ID,
        HEARING_ID,
        ROOM_ID,
        "",
        PARTICIPANT_ID
      );

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
  });

  describe("completeHearing method", () => {
    it("should be defined", () => {
      expect(service.completeHearing).toBeDefined();
    });

    it("should call post with expected parameters", () => {
      let expectedParameters = {
        action: CC_COMPLETE_HEARING,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        hearingId: HEARING_ID
      };

      service.completeHearing(
        RESERVATION_ID,
        CONFERENCE_ID,
        HEARING_ID
      );

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
  });

  describe("lockParticipant method", () => {
    it("should be defined", () => {
      expect(service.lockParticipant).toBeDefined();
    });

    it("should call post with expected parameters", () => {
      let expectedParameters = {
        action: CC_LOCK,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        hearingId: HEARING_ID,
        roomId: ROOM_ID,
        partyName: ""
      };

      service.lockParticipant(
        RESERVATION_ID,
        CONFERENCE_ID,
        HEARING_ID,
        ROOM_ID,
        ""
      );

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
  });

  describe("unlockParticipant method", () => {
    it("should be defined", () => {
      expect(service.unlockParticipant).toBeDefined();
    });

    it("should call post with expected parameters", () => {
      let expectedParameters = {
        action: CC_UNLOCK,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        hearingId: HEARING_ID,
        roomId: ROOM_ID,
        partyName: ""
      };

      service.unlockParticipant(
        RESERVATION_ID,
        CONFERENCE_ID,
        HEARING_ID,
        ROOM_ID,
        ""
      );

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
  });

  describe("addToHearing method", () => {
    it("should be defined", () => {
      expect(service.addToHearing).toBeDefined();
    });

    it("should call post with expected parameters", () => {
      let expectedParameters = {
        action: CC_ASSIGN_TO_HEARING,
        reservationId: RESERVATION_ID,
        hearingId: HEARING_ID,
        target: TARGET_HEARING_ID,
        partyName: "",
        roomId: ROOM_ID
      };

      service.addToHearing(
        RESERVATION_ID,
        HEARING_ID,
        TARGET_HEARING_ID,
        "",
        ROOM_ID
      );

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
  });

  describe('removeRoom method', () => {
    it('should be defined', () => {
      expect(service.removeRoom).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      let expectedParameters = {
        action: CC_REMOVE_ROOM,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        roomId: ROOM_ID,
        partyName: PARTY_NAME,
        hearingId: -1
      };

      service.removeRoom(RESERVATION_ID, CONFERENCE_ID, ROOM_ID, PARTY_NAME, null);

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });

    it('should call mockHttp get with participantId', () => {
      let expectedParameters = {
        action: CC_REMOVE_ROOM,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        roomId: ROOM_ID,
        partyName: PARTY_NAME,
        hearingId: -1,
        participantId: PARTICIPANT_ID
      };

      service.removeRoom(
        RESERVATION_ID,
        CONFERENCE_ID,
        ROOM_ID,
        PARTY_NAME,
        PARTICIPANT_ID
      );

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });

    describe('adjournHearing method', () => {
      it('should be defined', () => {
        expect(service.adjournHearing).toBeDefined();
      });

      it('should call mockHttp get with the expected parameters', () => {
        let expectedParameters = {
          action: CC_ADJOURN_HEARING,
          reservationId: RESERVATION_ID,
          conferenceId: CONFERENCE_ID,
          hearingId: HEARING_ID
        };

        service.adjournHearing(RESERVATION_ID, CONFERENCE_ID, HEARING_ID);

        expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
      });
    });

    describe('getRooms method', () => {
      it('should be defined', () => {
        expect(service.getRooms).toBeDefined();
      });

      it('should call mockHttp post with the expected parameters', () => {
        let expectedParameters = {
          action: CC_GET_ROOMS
        };

        service.getRooms();

        expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
      });
    });

    describe("addNewRoomToConference method", () => {
      it("should be defined", () => {
        expect(service.addNewRoomToConference).toBeDefined();
      });

      it("should call post without messageId if it is not defined", () => {
        let expectedParameters = {
          action: CC_ADD_ROOM,
          reservationId: RESERVATION_ID,
          conferenceId: CONFERENCE_ID,
          roomId: ROOM_ID,
          participantId: PARTICIPANT_ID
        };

        service.addNewRoomToConference(
          RESERVATION_ID,
          CONFERENCE_ID,
          ROOM_ID,
          null,
          PARTICIPANT_ID
        );

        expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
      });
    });

    describe("changeParticipantStatus method", () => {
      const STATUS_ID = 2;
      it("should be defined", () => {
        expect(service.changeParticipantStatus).toBeDefined();
      });

      it("should call post without messageId if it is not defined", () => {
        let expectedParameters = {
          action: CC_CHANGE_PARTICIPANT_STATUS,
          reservationId: RESERVATION_ID,
          conferenceId: CONFERENCE_ID,
          hearingId: HEARING_ID,
          statusId: STATUS_ID,
          roomId: ROOM_ID,
          participantId: PARTICIPANT_ID
        };

        service.changeParticipantStatus(
          RESERVATION_ID,
          CONFERENCE_ID,
          HEARING_ID,
          STATUS_ID,
          PARTICIPANT_ID,
          ROOM_ID
        );

        expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
      });

      it("should call post with messageId if it is defined", () => {
        let expectedParameters = {
          action: CC_CHANGE_PARTICIPANT_STATUS,
          reservationId: RESERVATION_ID,
          conferenceId: CONFERENCE_ID,
          hearingId: HEARING_ID,
          statusId: STATUS_ID,
          messageId: MESSAGE_ID,
          participantId: PARTICIPANT_ID
        };

        service.changeParticipantStatus(
          RESERVATION_ID,
          CONFERENCE_ID,
          HEARING_ID,
          STATUS_ID,
          PARTICIPANT_ID,
          undefined,
          MESSAGE_ID
        );

        expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
      });
    });
  });

  describe("setLocalSession method", () => {
    const NAME = "juan's Session", START_TIME = new Date(), END_TIME = new Date();
    it("should be defined", () => {
      expect(service.setLocalSession).toBeDefined();
    });

    it("should assign the session to localSession", () => {
      let sessionInstance = {
        id: RESERVATION_ID,
        name: NAME,
        startTime: START_TIME,
        endTime: END_TIME,
        conferences: []
      };

      let result = service.setLocalSession(sessionInstance);

      expect(result).toEqual(sessionInstance);
    });
  });

  describe("getLocalSession method", () => {
    const NAME = "juan's Session", START_TIME = new Date(), END_TIME = new Date();
    it("should be defined", () => {
      expect(service.getLocalSession).toBeDefined();
    });

    it("should assign the session to localSession", () => {
      let sessionInstance = {
        id: RESERVATION_ID,
        name: NAME,
        startTime: START_TIME,
        endTime: END_TIME,
        conferences: []
      };

      service.setLocalSession(sessionInstance);
      let result = service.getLocalSession();

      expect(result).toEqual(sessionInstance);
    });
  });

  describe("getLocalSessionConferences method", () => {
    const NAME = "juan's Session", START_TIME = new Date(), END_TIME = new Date();
    it("should be defined", () => {
      expect(service.getLocalSessionConferences).toBeDefined();
    });

    it("should assign the session to localSession", () => {
      let sessionInstance = {
        id: RESERVATION_ID,
        name: NAME,
        startTime: START_TIME,
        endTime: END_TIME,
        conferences: []
      };

      service.setLocalSession(sessionInstance);
      let result = service.getLocalSessionConferences();

      expect(result).toEqual([]);
    });
  });

  describe("getSecondaryConference method", () => {
    let primaryConference: Conference = {
      id: 1,
      mode: "Primary",
      title: "Court",
      status: "Locked",
      isLocked: true,
      hearings: [],
      rooms: []
    };
    let secondaryConference = {
      id: 2,
      mode: "Secondary",
      title: "Lobby",
      status: null,
      isLocked: true,
      hearings: [],
      rooms: []
    };

    const NAME = "juan's Session", START_TIME = new Date(), END_TIME = new Date();
    it("should be defined", () => {
      expect(service.getSecondaryConference).toBeDefined();
    });

    it("should return null if there is no secondary conference", () => {
      let sessionInstance = {
        id: RESERVATION_ID,
        name: NAME,
        startTime: START_TIME,
        endTime: END_TIME,
        conferences: [primaryConference]
      };

      service.setLocalSession(sessionInstance);
      let result = service.getSecondaryConference();

      expect(result).toEqual(null);
    });

    it("should return secondary conference if it is on conferences Array", () => {
      let sessionInstance = {
        id: RESERVATION_ID,
        name: NAME,
        startTime: START_TIME,
        endTime: END_TIME,
        conferences: [secondaryConference]
      };

      service.setLocalSession(sessionInstance);
      let result = service.getSecondaryConference();

      expect(result).toEqual(secondaryConference);
    });

    it("should return secondary conference if it is on conferences Array", () => {
      let sessionInstance = {
        id: RESERVATION_ID,
        name: NAME,
        startTime: START_TIME,
        endTime: END_TIME,
        conferences: [primaryConference, secondaryConference]
      };

      service.setLocalSession(sessionInstance);
      let result = service.getSecondaryConference();

      expect(result).toEqual(secondaryConference);
    });
  });


  describe("crackHearing method", () => {
    it("should be defined", () => {
      expect(service.crackHearing).toBeDefined();
    });

    it("should call post with expected parameters", () => {
      let expectedParameters = {
        action: CC_CRACKING_HEARING,
        reservationId: RESERVATION_ID,
        conferenceId: CONFERENCE_ID,
        hearingId: HEARING_ID
      };

      service.crackHearing(
        RESERVATION_ID,
        CONFERENCE_ID,
        HEARING_ID
      );

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
  });

  describe("disassociateRoomFromParticipant method", () => {
    const CC_DISASSOCIATE_HEARING = "disassociateRoom";
    it("should be defined", () => {
      expect(service.disassociateRoomFromParticipant).toBeDefined();
    });

    it("should call post without messageID", () => {
      let expectedParameters = {
        action: CC_DISASSOCIATE_HEARING,
        reservationId: RESERVATION_ID,
        hearingId: HEARING_ID,
        participantId: PARTICIPANT_ID
      };

      service.disassociateRoomFromParticipant(
        RESERVATION_ID,
        HEARING_ID,
        PARTICIPANT_ID
      );

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });
    it("should call post with messageID", () => {
      let expectedParameters = {
        action: CC_DISASSOCIATE_HEARING,
        reservationId: RESERVATION_ID,
        hearingId: HEARING_ID,
        participantId: PARTICIPANT_ID,
        messageId: MESSAGE_ID
      };

      service.disassociateRoomFromParticipant(
        RESERVATION_ID,
        HEARING_ID,
        PARTICIPANT_ID,
        MESSAGE_ID
      );

      expect(mockHttp.post).toHaveBeenCalledWith(SESSIONS_URL, expectedParameters);
    });

  });
});

