import { UpcomingSessionsModule } from './upcoming-sessions.module';

describe('UpcomingSessionsModule', () => {
  let upcomingSessionsModule: UpcomingSessionsModule;

  beforeEach(() => {
    upcomingSessionsModule = new UpcomingSessionsModule();
  });

  it('should create an instance', () => {
    expect(upcomingSessionsModule).toBeTruthy();
  });
});
