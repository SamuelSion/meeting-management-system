import axios from "axios";
import { appConfig } from "../utils/app-config";
import type { MeetingModel } from "../models/meeting-model";

class MeetingService {

    // Get all meetings of a specific development group:
    public async getMeetingsByDevGroup(devGroupId: string): Promise<MeetingModel[]> {
        const response = await axios.get<MeetingModel[]>(appConfig.meetingsByDevGroupUrl(devGroupId));
        return response.data;
    }

    // Get one meeting by id:
    public async getOneMeeting(id: string): Promise<MeetingModel> {
        const response = await axios.get<MeetingModel>(appConfig.meetingByIdUrl(id));
        return response.data;
    }

    // Add a new meeting:
    public async addMeeting(meeting: Partial<MeetingModel>): Promise<MeetingModel> {
        const response = await axios.post<MeetingModel>(appConfig.meetingsUrl, meeting);
        return response.data;
    }

    // Update an existing meeting:
    public async updateMeeting(meeting: Partial<MeetingModel>): Promise<MeetingModel> {
        const response = await axios.put<MeetingModel>(appConfig.meetingByIdUrl(meeting._id!), meeting);
        return response.data;
    }

    // Delete an existing meeting:
    public async deleteMeeting(id: string): Promise<void> {
        await axios.delete(appConfig.meetingByIdUrl(id));
    }

}

export const meetingService = new MeetingService();
