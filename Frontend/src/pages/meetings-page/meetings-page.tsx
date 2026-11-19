import { useEffect, useState } from "react";
import {
    Alert,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { devGroupService } from "../../services/dev-group-service";
import { meetingService } from "../../services/meeting-service";
import type { DevGroupModel } from "../../models/dev-group-model";
import type { MeetingModel } from "../../models/meeting-model";
import { MeetingCard } from "../../components/meeting-card/meeting-card";
import "./meetings-page.css";

export function MeetingsPage(): React.JSX.Element {

    const [devGroups, setDevGroups] = useState<DevGroupModel[]>([]);
    const [selectedDevGroupId, setSelectedDevGroupId] = useState<string>("");
    const [meetings, setMeetings] = useState<MeetingModel[]>([]);
    const [isLoadingGroups, setIsLoadingGroups] = useState<boolean>(true);
    const [isLoadingMeetings, setIsLoadingMeetings] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        devGroupService.getAllDevGroups()
            .then((dbDevGroups) => setDevGroups(dbDevGroups))
            .catch(() => setErrorMessage("אירעה שגיאה בטעינת קבוצות הפיתוח."))
            .finally(() => setIsLoadingGroups(false));
    }, []);

    useEffect(() => {
        if (!selectedDevGroupId) {
            setMeetings([]);
            return;
        }

        setIsLoadingMeetings(true);
        setErrorMessage("");

        meetingService.getMeetingsByDevGroup(selectedDevGroupId)
            .then((dbMeetings) => setMeetings(dbMeetings))
            .catch(() => setErrorMessage("אירעה שגיאה בטעינת הפגישות."))
            .finally(() => setIsLoadingMeetings(false));
    }, [selectedDevGroupId]);

    function handleDevGroupChange(event: SelectChangeEvent<string>): void {
        setSelectedDevGroupId(event.target.value);
    }

    function handleDeleteMeeting(id: string): void {
        meetingService.deleteMeeting(id)
            .then(() => setMeetings((current) => current.filter((meeting) => meeting._id !== id)))
            .catch(() => setErrorMessage("אירעה שגיאה במחיקת הפגישה."));
    }

    return (
        <div>
            <Typography variant="h4" component="h1" className="meetings-page__title">
                פגישות קבוצות הפיתוח
            </Typography>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <div className="meetings-page__select-wrapper">
                <FormControl fullWidth disabled={isLoadingGroups}>
                    <InputLabel id="dev-group-select-label">קבוצת פיתוח</InputLabel>
                    <Select
                        labelId="dev-group-select-label"
                        label="קבוצת פיתוח"
                        value={selectedDevGroupId}
                        onChange={handleDevGroupChange}
                    >
                        <MenuItem value="" disabled>
                            בחר קבוצת פיתוח
                        </MenuItem>
                        {devGroups.map((devGroup) => (
                            <MenuItem key={devGroup._id} value={devGroup._id}>
                                {devGroup.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {isLoadingMeetings && (
                <div className="meetings-page__loading">
                    <CircularProgress />
                </div>
            )}

            {!isLoadingMeetings && selectedDevGroupId && meetings.length === 0 && (
                <Typography className="meetings-page__empty">
                    לא נמצאו פגישות עבור קבוצת הפיתוח שנבחרה.
                </Typography>
            )}

            {!isLoadingMeetings && !selectedDevGroupId && (
                <Typography className="meetings-page__empty">
                    יש לבחור קבוצת פיתוח כדי לצפות בפגישות שלה.
                </Typography>
            )}

            {!isLoadingMeetings && meetings.length > 0 && (
                <div className="meetings-page__grid">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting._id} meeting={meeting} onDelete={handleDeleteMeeting} />
                    ))}
                </div>
            )}
        </div>
    );
}
