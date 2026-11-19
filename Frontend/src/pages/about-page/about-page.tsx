import { Avatar, Paper, Typography } from "@mui/material";
import "./about-page.css";

export function AboutPage(): React.JSX.Element {
    return (
        <div className="about-page">
            <Typography variant="h4" component="h1" className="about-page__title">
                אודות
            </Typography>

            <Paper elevation={0} variant="outlined" className="about-page__section">
                <Typography variant="h6" className="about-page__section-title">
                    על המערכת
                </Typography>
                <Typography className="about-page__paragraph">
                    יומן הפגישות פותח עבור חברת הייטק המונה מספר קבוצות פיתוח — QA, R&amp;D ו-DevOps.
                    המטרה היא לתת לכל קבוצה מקום מרוכז לניהול הפגישות שלה: קביעת פגישות חדשות בחדרי הישיבות
                    בחברה, צפייה בכל הפגישות של הקבוצה ממוינות לפי מועד, עדכון פרטי פגישה קיימת ומחיקת פגישות
                    שאינן רלוונטיות עוד. המערכת בנויה כאתר Frontend ב-React מול שירות Backend ב-Node.js,
                    ששומר את הנתונים במסד נתונים מסוג MongoDB.
                </Typography>
            </Paper>

            <Paper elevation={0} variant="outlined" className="about-page__section">
                <Typography variant="h6" className="about-page__section-title">
                    על המתכנת
                </Typography>
                <div className="about-page__developer">
                    {/* Placeholder avatar - to be replaced with an uploaded photo. */}
                    <Avatar className="about-page__avatar">ש</Avatar>
                    <div className="about-page__developer-info">
                        <Typography className="about-page__developer-name">שמואל סיון</Typography>
                        <Typography className="about-page__developer-role">
                            סטודנט Full Stack Development, ג'ון ברייס
                        </Typography>
                        <Typography className="about-page__paragraph">
                            בעל רקע קודם בתחומי מודיעין ואכיפה פיננסית, ומעבר לקריירה בפיתוח תוכנה.
                            מערכת זו נבנתה כחלק ממשימה בקורס ה-Full Stack, ומשלבת בין React, TypeScript,
                            Node.js ו-MongoDB.
                        </Typography>
                    </div>
                </div>
            </Paper>
        </div>
    );
}
