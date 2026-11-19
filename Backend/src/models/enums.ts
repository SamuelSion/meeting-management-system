// Centralized HTTP status codes, used instead of "magic numbers" across the project:
export enum StatusCode {

    // Success:
    OK = 200,
    Created = 201,
    NoContent = 204,

    // Client Errors:
    BadRequest = 400,
    NotFound = 404,
    Conflict = 409,
    UnprocessableContent = 422,

    // Server Errors:
    InternalServerError = 500

}

// Fixed set of meeting rooms available in the company:
export enum MeetingRoom {
    BlueRoom = "Blue Room",
    GreenRoom = "Green Room",
    OrangeRoom = "Orange Room"
}
