import { Card, CardContent, Chip, IconButton, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RoomIcon from "@mui/icons-material/Room";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import type { MeetingModel } from "../../models/meeting-model";
import { formatDateTime, formatDuration, isFutureStart } from "../../utils/date-time-util";
import "./meeting-card.css";

interface MeetingCardProps {
    meeting: MeetingModel;
    onDelete: (id: string) => void;
}

export function MeetingCard(props: MeetingCardProps): React.JSX.Element {

    const navigate = useNavigate();
    const future = isFutureStart(props.meeting.startDateTime);

    function handleDeleteClick(): void {
        const confirmed = window.confirm("האם אתה בטוח שברצונך למחוק את הפגישה?");
        if (confirmed) {
            props.onDelete(props.meeting._id);
        }
    }

    function handleEditClick(): void {
        navigate(`/meetings/edit/${props.meeting._id}`);
    }

    return (
        <Card
            variant="outlined"
            className={`meeting-card ${future ? "meeting-card--future" : "meeting-card--past"}`}
        >
            <CardContent>
                <div className="meeting-card__header">
                    <Typography className="meeting-card__room">{props.meeting.room}</Typography>
                    <Chip
                        size="small"
                        label={future ? "פגישה עתידית" : "פגישה שהתקיימה"}
                        className={`meeting-card__status-chip ${
                            future
                                ? "meeting-card__status-chip--future"
                                : "meeting-card__status-chip--past"
                        }`}
                    />
                </div>

                <div className="meeting-card__row">
                    <AccessTimeIcon className="meeting-card__row-icon" />
                    <span>
                        {formatDateTime(props.meeting.startDateTime)} — {formatDateTime(props.meeting.endDateTime)}
                    </span>
                </div>

                <div className="meeting-card__row">
                    <RoomIcon className="meeting-card__row-icon" />
                    <span>משך הפגישה: {formatDuration(props.meeting.startDateTime, props.meeting.endDateTime)}</span>
                </div>

                <Typography className="meeting-card__description" variant="body2">
                    {props.meeting.description}
                </Typography>

                <div className="meeting-card__actions">
                    <IconButton size="small" color="primary" onClick={handleEditClick} aria-label="עריכת פגישה">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={handleDeleteClick} aria-label="מחיקת פגישה">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
}
