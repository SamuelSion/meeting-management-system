// Shape of the raw form fields, before they are sent to the server:
export interface MeetingFormFields {
    devGroupId: string;
    startDateTime: string; // Value coming from <input type="datetime-local">.
    endDateTime: string;
    description: string;
    room: string;
}

export type MeetingFormErrors = Partial<Record<keyof MeetingFormFields, string>>;

class MeetingValidationService {

    // Validates the "add meeting" form - all fields required, no past start time, start before end:
    public validateAddForm(fields: MeetingFormFields): MeetingFormErrors {
        const errors = this.validateCommonFields(fields);

        if (fields.startDateTime && !errors.startDateTime) {
            const startTime = new Date(fields.startDateTime).getTime();
            if (startTime < Date.now()) {
                errors.startDateTime = "לא ניתן להוסיף פגישה עם זמן התחלה בעבר.";
            }
        }

        return errors;
    }

    // Validates the "edit meeting" form - a past start time is allowed here on purpose:
    public validateEditForm(fields: MeetingFormFields): MeetingFormErrors {
        return this.validateCommonFields(fields);
    }

    // Shared rules for both add and edit: required fields + start before end:
    private validateCommonFields(fields: MeetingFormFields): MeetingFormErrors {
        const errors: MeetingFormErrors = {};

        if (!fields.devGroupId) {
            errors.devGroupId = "יש לבחור קבוצת פיתוח.";
        }
        if (!fields.startDateTime) {
            errors.startDateTime = "יש להזין זמן התחלת פגישה.";
        }
        if (!fields.endDateTime) {
            errors.endDateTime = "יש להזין זמן סיום פגישה.";
        }
        if (!fields.description || fields.description.trim() === "") {
            errors.description = "יש להזין תיאור פגישה.";
        }
        if (!fields.room) {
            errors.room = "יש לבחור חדר פגישה.";
        }

        if (fields.startDateTime && fields.endDateTime) {
            const startTime = new Date(fields.startDateTime).getTime();
            const endTime = new Date(fields.endDateTime).getTime();
            if (startTime >= endTime) {
                errors.endDateTime = "זמן הסיום חייב להיות מאוחר יותר מזמן ההתחלה.";
            }
        }

        return errors;
    }

}

export const meetingValidationService = new MeetingValidationService();
