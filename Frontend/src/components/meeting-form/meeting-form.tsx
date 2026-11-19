import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { DevGroupModel } from "../../models/dev-group-model";
import { MeetingRoom } from "../../models/meeting-model";
import type { MeetingFormFields, MeetingFormErrors } from "../../services/meeting-validation-service";
import "./meeting-form.css";

const roomOptions = Object.values(MeetingRoom);

interface MeetingFormProps {
    devGroups: DevGroupModel[];
    fields: MeetingFormFields;
    errors: MeetingFormErrors;
    submitLabel: string;
    isSubmitting: boolean;
    onFieldChange: (field: keyof MeetingFormFields, value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export function MeetingForm(props: MeetingFormProps): React.JSX.Element {

    function handleTextChange(field: keyof MeetingFormFields) {
        return (event: React.ChangeEvent<HTMLInputElement>): void => {
            props.onFieldChange(field, event.target.value);
        };
    }

    function handleSelectChange(field: keyof MeetingFormFields) {
        return (event: SelectChangeEvent<string>): void => {
            props.onFieldChange(field, event.target.value);
        };
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        props.onSubmit();
    }

    return (
        <form className="meeting-form" onSubmit={handleSubmit} noValidate>
            <FormControl fullWidth className="meeting-form__field" error={!!props.errors.devGroupId}>
                <InputLabel id="meeting-form-dev-group-label">קבוצת פיתוח</InputLabel>
                <Select
                    labelId="meeting-form-dev-group-label"
                    label="קבוצת פיתוח"
                    value={props.fields.devGroupId}
                    onChange={handleSelectChange("devGroupId")}
                >
                    <MenuItem value="" disabled>
                        בחר קבוצת פיתוח
                    </MenuItem>
                    {props.devGroups.map((devGroup) => (
                        <MenuItem key={devGroup._id} value={devGroup._id}>
                            {devGroup.name}
                        </MenuItem>
                    ))}
                </Select>
                {props.errors.devGroupId && <FormHelperText>{props.errors.devGroupId}</FormHelperText>}
            </FormControl>

            <TextField
                fullWidth
                className="meeting-form__field"
                label="זמן התחלה"
                type="datetime-local"
                slotProps={{ inputLabel: { shrink: true } }}
                value={props.fields.startDateTime}
                onChange={handleTextChange("startDateTime")}
                error={!!props.errors.startDateTime}
                helperText={props.errors.startDateTime}
            />

            <TextField
                fullWidth
                className="meeting-form__field"
                label="זמן סיום"
                type="datetime-local"
                slotProps={{ inputLabel: { shrink: true } }}
                value={props.fields.endDateTime}
                onChange={handleTextChange("endDateTime")}
                error={!!props.errors.endDateTime}
                helperText={props.errors.endDateTime}
            />

            <FormControl fullWidth className="meeting-form__field" error={!!props.errors.room}>
                <InputLabel id="meeting-form-room-label">חדר פגישה</InputLabel>
                <Select
                    labelId="meeting-form-room-label"
                    label="חדר פגישה"
                    value={props.fields.room}
                    onChange={handleSelectChange("room")}
                >
                    <MenuItem value="" disabled>
                        בחר חדר פגישה
                    </MenuItem>
                    {roomOptions.map((room) => (
                        <MenuItem key={room} value={room}>
                            {room}
                        </MenuItem>
                    ))}
                </Select>
                {props.errors.room && <FormHelperText>{props.errors.room}</FormHelperText>}
            </FormControl>

            <TextField
                fullWidth
                multiline
                minRows={3}
                className="meeting-form__field"
                label="תיאור הפגישה"
                value={props.fields.description}
                onChange={handleTextChange("description")}
                error={!!props.errors.description}
                helperText={props.errors.description}
            />

            <div className="meeting-form__actions">
                <Button type="submit" variant="contained" color="primary" disabled={props.isSubmitting}>
                    {props.submitLabel}
                </Button>
                <Button type="button" variant="text" onClick={props.onCancel}>
                    ביטול
                </Button>
            </div>
        </form>
    );
}
