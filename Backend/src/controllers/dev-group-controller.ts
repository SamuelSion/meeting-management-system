import express, { Request, Response, Router } from "express";
import { devGroupService } from "../services/dev-group-service";

// Contains routes only, without logic:
class DevGroupController {

    // Create a router object which can listen on routes:
    public router: Router = express.Router();

    // Constructor - register routes:
    public constructor() {
        this.router.get("/api/dev-groups", this.getAllDevGroups);
    }

    // Get all development groups:
    private async getAllDevGroups(request: Request, response: Response): Promise<void> {
        const devGroups = await devGroupService.getAllDevGroups();
        response.json(devGroups);
    }

}

export const devGroupController = new DevGroupController();
