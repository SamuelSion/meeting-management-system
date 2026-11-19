import { useEffect, useState } from "react";
import { Alert, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { devGroupService } from "../../services/dev-group-service";
import { meetingService } from "../../services/meeting-service";
import { meetingValidationService } from "../../services/meeting-validation-service";
import type { MeetingFormFields, MeetingFormErrors } from "../../services/meeting-validation-service";
import type { DevGroupModel } from "../../models/dev-group-model";
import { MeetingForm } from "../../components/meeting-form/meeting-form";
import "./add-meeting-page.css";

const emptyFields: MeetingFormFields = {
    devGroupId: "",
    startDateTime: "",
    endDateTime: "",
    description: "",
    room: ""
};

export function AddMeetingPage(): React.JSX.Element {

    const navigate = useNavigate();

    const [devGroups, setDevGroups] = useState<DevGroupModel[]>([]);
    const [fields, setFields] = useState<MeetingFormFields>(emptyFields);
    const [errors, setErrors] = useState<MeetingFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string>("");

    useEffect(() => {
        devGroupService.getAllDevGroups()
            .then((dbDevGroups) => setDevGroups(dbDevGroups))
            .catch(() => setServerError("אירעה שגיאה בטעינת קבוצות הפיתוח."));
    }, []);

    function handleFieldChange(field: keyof MeetingFormFields, value: string): void {
        setFields((current) => ({ ...current, [field]: value }));
    }

    function handleSubmit(): void {
        const validationErrors = meetingValidationService.validateAddForm(fields);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        setServerError("");

        meetingService.addMeeting({
                devGroupId: fields.devGroupId,
                startDateTime: new Date(fields.startDateTime).toISOString(),
                endDateTime: new Date(fields.endDateTime).toISOString(),
                description: fields.description,
                room: fields.room
            })
            .then(() => navigate("/meetings"))
            .catch((err) => {
                const message = err?.response?.data?.message || "אירעה שגיאה בהוספת הפגישה.";
                setServerError(message);
            })
            .finally(() => setIsSubmitting(false));
    }

    return (
        <div>
            <Typography variant="h4" component="h1" className="add-meeting-page__title">
                הוספת פגישה חדשה
            </Typography>

            {serverError && <Alert severity="error">{serverError}</Alert>}

            <MeetingForm
                devGroups={devGroups}
                fields={fields}
                errors={errors}
                submitLabel="הוספת פגישה"
                isSubmitting={isSubmitting}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/meetings")}
            />
        </div>
    );
}
