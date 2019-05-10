import { SessionService } from './session.service';

describe('SessionService', () => {
  const FILTER_HEARING_SEARCH = "GTL",
    PENDING_HEARINGS_SORT = "conference,desc";
  let service: SessionService,
    mockHttp;
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj("http", ["post"]);
    service = new SessionService(mockHttp);
  });

  describe("searchHearings method", () => {
    it('should be defined', () => {
      expect(service.searchHearings).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      const url = "../bridgeControl.do";
      const action = "searchHearings";

      service.searchHearings(FILTER_HEARING_SEARCH, PENDING_HEARINGS_SORT);

      expect(mockHttp.post).toHaveBeenCalledWith(url, { action: action, search: FILTER_HEARING_SEARCH });
    });
  });

  describe("getHearingDetails method", () => {
    const HEARING_ID = 1;
    it('should be defined', () => {
      expect(service.getHearingDetails).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      const url = "../bridgeControl.do";
      const action = "getHearingDetails";

      service.getHearingDetails(HEARING_ID);

      expect(mockHttp.post).toHaveBeenCalledWith(url, { action: action, hearingId: HEARING_ID });
    });
  });

  describe("getUpcomingSessions method", () => {
    const HEARING_ID = 1;
    it('should be defined', () => {
      expect(service.getUpcomingSessions).toBeDefined();
    });

    it('should call mockHttp get with the expected parameters', () => {
      const url = "../bridgeControl.do";
      const action = "getSessionsUpcoming";

      service.getUpcomingSessions();

      expect(mockHttp.post).toHaveBeenCalledWith(url, { action: action });
    });
  });
});

