import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroIllustration from "../../assets/hero-illustration.svg";
import "./home-page.css";

export function HomePage(): React.JSX.Element {

    const navigate = useNavigate();

    return (
        <div className="home-page">
            <div className="home-page__text">
                <Typography variant="h4" component="h1" className="home-page__title">
                    ברוכים הבאים
                    <br />
                    ליומן הפגישות
                </Typography>
                <Typography className="home-page__paragraph">
                    המערכת נבנתה עבור קבוצות הפיתוח בחברת ההייטק, ומרכזת במקום אחד את כל הפגישות של
                    צוותי ה-QA, ה-R&amp;D וה-DevOps. ניתן לצפות בפגישות של כל קבוצת פיתוח בנפרד, לקבוע
                    פגישה חדשה בחדרי הישיבות, לעדכן פרטים של פגישה קיימת ולמחוק פגישות שאינן רלוונטיות
                    עוד — הכל בממשק פשוט ונוח לשימוש.
                </Typography>
                <div className="home-page__cta">
                    <Button variant="contained" color="primary" onClick={() => navigate("/meetings")}>
                        צפייה בפגישות
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => navigate("/meetings/add")}>
                        הוספת פגישה חדשה
                    </Button>
                </div>
            </div>
            <div className="home-page__image-wrapper">
                <img
                    src={heroIllustration}
                    alt="איור של צוותי פיתוח יושבים סביב שולחן ישיבות עם לוח שנה ושעון ברקע"
                    className="home-page__image"
                />
            </div>
        </div>
    );
}
