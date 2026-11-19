import { MeetingModel, IMeetingModel } from "../models/meeting-model";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { devGroupService } from "./dev-group-service";

class MeetingService {

    // Get all meetings of a specific development group, ordered by start time:
    public async getMeetingsByDevGroup(devGroupId: string): Promise<IMeetingModel[]> {

        // Make sure the development group actually exists:
        await devGroupService.getOneDevGroup(devGroupId);

        const meetings = await MeetingModel
            .find({ devGroupId })
            .populate("devGroup")
            .sort({ startDateTime: 1 })
            .exec();

        return meetings;
    }

    // Get one meeting by id:
    public async getOneMeeting(_id: string): Promise<IMeetingModel> {
        const dbMeeting = await MeetingModel.findById(_id).populate("devGroup").exec();
        if (!dbMeeting) {
            throw new ClientError(StatusCode.NotFound, `Meeting with id ${_id} not found.`);
        }
        return dbMeeting;
    }

    // Add a new meeting:
    public async addMeeting(meeting: IMeetingModel): Promise<IMeetingModel> {

        // Guard against a missing/empty devGroupId (e.g. an unfilled Postman variable) -
        // without this check, calling .toString() below would crash with a confusing
        // "Cannot read properties of undefined" error instead of a clear message.
        if (!meeting.devGroupId) {
            throw new ClientError(StatusCode.UnprocessableContent, "devGroupId is required.");
        }

        // Make sure the referenced development group exists:
        await devGroupService.getOneDevGroup(meeting.devGroupId.toString());

        // Schema-level validation (required fields, room enum, end after start):
        await ClientError.validate(meeting);

        // Business rule - a new meeting cannot start in the past:
        if (meeting.startDateTime.getTime() < Date.now()) {
            throw new ClientError(StatusCode.UnprocessableContent, "A new meeting cannot start in the past.");
        }

        const dbMeeting = await meeting.save();
        return dbMeeting;
    }

    // Update an existing meeting:
    public async updateMeeting(meeting: IMeetingModel): Promise<IMeetingModel> {

        // Guard against a missing/empty devGroupId, same reasoning as in addMeeting:
        if (!meeting.devGroupId) {
            throw new ClientError(StatusCode.UnprocessableContent, "devGroupId is required.");
        }

        // Make sure the referenced development group exists:
        await devGroupService.getOneDevGroup(meeting.devGroupId.toString());

        // Schema-level validation (required fields, room enum, end after start):
        await ClientError.validate(meeting);

        // Updating a meeting that already started in the past is allowed on purpose.
        // Note: runValidators is intentionally NOT used here - our custom endDateTime
        // validator reads `this.startDateTime`, which only exists on a real Document.
        // Under update-query validation, `this` is bound to the Query instead, so the
        // validator would incorrectly fail even for valid data. ClientError.validate()
        // above already performed the real (document-level) validation.
        const dbMeeting = await MeetingModel.findByIdAndUpdate(
            meeting._id,
            meeting,
            { returnDocument: "after" }
        ).exec();

        if (!dbMeeting) {
            throw new ClientError(StatusCode.NotFound, `Meeting with id ${meeting._id} not found.`);
        }

        return dbMeeting;
    }

    // Delete an existing meeting:
    public async deleteMeeting(_id: string): Promise<void> {
        const dbMeeting = await MeetingModel.findByIdAndDelete(_id).exec();
        if (!dbMeeting) {
            throw new ClientError(StatusCode.NotFound, `Meeting with id ${_id} not found.`);
        }
    }

}

export const meetingService = new MeetingService();
