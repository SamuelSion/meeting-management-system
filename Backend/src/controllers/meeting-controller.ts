import express, { Request, Response, Router } from "express";
import { meetingService } from "../services/meeting-service";
import { MeetingModel } from "../models/meeting-model";
import { StatusCode } from "../models/enums";

// Contains routes only, without logic:
class MeetingController {

    // Create a router object which can listen on routes:
    public router: Router = express.Router();

    // Constructor - register routes:
    public constructor() {
        this.router.get("/api/meetings/dev-group/:devGroupId", this.getMeetingsByDevGroup);
        this.router.get("/api/meetings/:id", this.getOneMeeting);
        this.router.post("/api/meetings", this.addMeeting);
        this.router.put("/api/meetings/:id", this.updateMeeting);
        this.router.delete("/api/meetings/:id", this.deleteMeeting);
    }

    // Get all meetings of a specific development group:
    private async getMeetingsByDevGroup(request: Request, response: Response): Promise<void> {
        const devGroupId = String(request.params.devGroupId);
        const meetings = await meetingService.getMeetingsByDevGroup(devGroupId);
        response.json(meetings);
    }

    // Get one meeting by id:
    private async getOneMeeting(request: Request, response: Response): Promise<void> {
        const id = String(request.params.id);
        const meeting = await meetingService.getOneMeeting(id);
        response.json(meeting);
    }

    // Add a new meeting:
    private async addMeeting(request: Request, response: Response): Promise<void> {
        const meeting = new MeetingModel(request.body); // Build a new Document from the Model.
        const dbMeeting = await meetingService.addMeeting(meeting);
        response.status(StatusCode.Created).json(dbMeeting);
    }

    // Update an existing meeting:
    private async updateMeeting(request: Request, response: Response): Promise<void> {
        request.body._id = request.params.id;
        const meeting = new MeetingModel(request.body);
        meeting.isNew = false; // Tell mongoose this document already exists in the database.
        const dbMeeting = await meetingService.updateMeeting(meeting);
        response.json(dbMeeting);
    }

    // Delete an existing meeting:
    private async deleteMeeting(request: Request, response: Response): Promise<void> {
        const id = String(request.params.id);
        await meetingService.deleteMeeting(id);
        response.status(StatusCode.NoContent).send();
    }

}

export const meetingController = new MeetingController();
