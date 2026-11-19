import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./not-found-page.css";

export function NotFoundPage(): React.JSX.Element {

    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <Typography className="not-found-page__code">404</Typography>
            <Typography variant="h5" component="h1" className="not-found-page__title">
                העמוד שחיפשת לא נמצא
            </Typography>
            <Typography className="not-found-page__text">
                ייתכן שהכתובת שגויה, או שהעמוד הוסר מהמערכת.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/")}>
                חזרה לדף הבית
            </Button>
        </div>
    );
}
