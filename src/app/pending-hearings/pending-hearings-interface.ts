import { Participant } from "../participant/participant";
import { HearingI } from "../hearing/hearingI";

export interface PendingHearingsI {
    collapsed: boolean;
    hearingObject: HearingI;
    hearingObjectDetails: {
        hearingParticipants: Array<Participant>;
        additionalInformation: string;
    };
}
