import { DevGroupModel, IDevGroupModel } from "../models/dev-group-model";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";

class DevGroupService {

    // Get all development groups in the company:
    public async getAllDevGroups(): Promise<IDevGroupModel[]> {
        const devGroups = await DevGroupModel.find().exec();
        return devGroups;
    }

    // Get one development group by id - used internally to validate a meeting's devGroupId:
    public async getOneDevGroup(_id: string): Promise<IDevGroupModel> {
        const dbDevGroup = await DevGroupModel.findById(_id).exec();
        if (!dbDevGroup) {
            throw new ClientError(StatusCode.NotFound, `Development group with id ${_id} not found.`);
        }
        return dbDevGroup;
    }

}

export const devGroupService = new DevGroupService();
