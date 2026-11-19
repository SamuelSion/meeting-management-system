import { useEffect, useState } from "react";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { devGroupService } from "../../services/dev-group-service";
import { meetingService } from "../../services/meeting-service";
import { meetingValidationService } from "../../services/meeting-validation-service";
import type { MeetingFormFields, MeetingFormErrors } from "../../services/meeting-validation-service";
import type { DevGroupModel } from "../../models/dev-group-model";
import { MeetingForm } from "../../components/meeting-form/meeting-form";
import { toDatetimeLocalValue } from "../../utils/date-time-util";
import "./edit-meeting-page.css";

const emptyFields: MeetingFormFields = {
    devGroupId: "",
    startDateTime: "",
    endDateTime: "",
    description: "",
    room: ""
};

export function EditMeetingPage(): React.JSX.Element {

    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    const [devGroups, setDevGroups] = useState<DevGroupModel[]>([]);
    const [fields, setFields] = useState<MeetingFormFields>(emptyFields);
    const [errors, setErrors] = useState<MeetingFormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string>("");

    useEffect(() => {
        const id = params.id!;

        Promise.all([devGroupService.getAllDevGroups(), meetingService.getOneMeeting(id)])
            .then(([dbDevGroups, dbMeeting]) => {
                setDevGroups(dbDevGroups);
                setFields({
                    devGroupId: dbMeeting.devGroupId,
                    startDateTime: toDatetimeLocalValue(dbMeeting.startDateTime),
                    endDateTime: toDatetimeLocalValue(dbMeeting.endDateTime),
                    description: dbMeeting.description,
                    room: dbMeeting.room
                });
            })
            .catch(() => setServerError("אירעה שגיאה בטעינת פרטי הפגישה."))
            .finally(() => setIsLoading(false));
    }, [params.id]);

    function handleFieldChange(field: keyof MeetingFormFields, value: string): void {
        setFields((current) => ({ ...current, [field]: value }));
    }

    function handleSubmit(): void {
        const validationErrors = meetingValidationService.validateEditForm(fields);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        setServerError("");

        meetingService.updateMeeting({
                _id: params.id!,
                devGroupId: fields.devGroupId,
                startDateTime: new Date(fields.startDateTime).toISOString(),
                endDateTime: new Date(fields.endDateTime).toISOString(),
                description: fields.description,
                room: fields.room
            })
            .then(() => navigate("/meetings"))
            .catch((err) => {
                const message = err?.response?.data?.message || "אירעה שגיאה בעדכון הפגישה.";
                setServerError(message);
            })
            .finally(() => setIsSubmitting(false));
    }

    if (isLoading) {
        return (
            <div className="edit-meeting-page__loading">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <Typography variant="h4" component="h1" className="edit-meeting-page__title">
                עדכון פגישה
            </Typography>

            {serverError && <Alert severity="error">{serverError}</Alert>}

            <MeetingForm
                devGroups={devGroups}
                fields={fields}
                errors={errors}
                submitLabel="שמירת שינויים"
                isSubmitting={isSubmitting}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/meetings")}
            />
        </div>
    );
}
