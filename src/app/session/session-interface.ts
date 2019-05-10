import { HearingI } from "../hearing/hearingI";

export class SessionI {
    id: number;
    sessionName: string;
    startTime: string;
    endTime: string;
    hearings: Array<HearingI>;
}
