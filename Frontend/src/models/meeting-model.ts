// The fixed set of meeting rooms, matching the backend enum exactly:
export const MeetingRoom = {
    BlueRoom: "Blue Room",
    GreenRoom: "Green Room",
    OrangeRoom: "Orange Room"
} as const;

export type MeetingRoom = (typeof MeetingRoom)[keyof typeof MeetingRoom];

// Mirrors the Meeting document returned by the backend:
export interface MeetingModel {
    _id: string;
    devGroupId: string;
    startDateTime: string; // ISO date string, as received from the server.
    endDateTime: string;
    description: string;
    room: MeetingRoom | string;
    devGroup?: {
        _id: string;
        name: string;
    };
}
