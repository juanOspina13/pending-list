export interface HearingI {
    reservationId: number;
    description: string;
    courtRoomName: string;
    detaineeRoomName: string;
    handcuffs: boolean;
    supervision: boolean;
    youth: boolean;
    needsInterpreter: boolean;
    breachOfBailDVPO: boolean;
    countDownTime: number;
    statusId: number;
    status: string;
    priority: number;
    id: number;
}
