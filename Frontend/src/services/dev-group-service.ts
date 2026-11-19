import axios from "axios";
import { appConfig } from "../utils/app-config";
import type { DevGroupModel } from "../models/dev-group-model";

class DevGroupService {

    // Get all development groups:
    public async getAllDevGroups(): Promise<DevGroupModel[]> {
        const response = await axios.get<DevGroupModel[]>(appConfig.devGroupsUrl);
        return response.data;
    }

}

export const devGroupService = new DevGroupService();
