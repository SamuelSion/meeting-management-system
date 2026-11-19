import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Layout } from "../components/layout/layout";

const HomePage = lazy(() => import("../pages/home-page/home-page").then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("../pages/about-page/about-page").then((m) => ({ default: m.AboutPage })));
const MeetingsPage = lazy(() =>
    import("../pages/meetings-page/meetings-page").then((m) => ({ default: m.MeetingsPage }))
);
const AddMeetingPage = lazy(() =>
    import("../pages/add-meeting-page/add-meeting-page").then((m) => ({ default: m.AddMeetingPage }))
);
const EditMeetingPage = lazy(() =>
    import("../pages/edit-meeting-page/edit-meeting-page").then((m) => ({ default: m.EditMeetingPage }))
);
const NotFoundPage = lazy(() =>
    import("../pages/not-found-page/not-found-page").then((m) => ({ default: m.NotFoundPage }))
);

function SuspenseFallback(): React.JSX.Element {
    return <CircularProgress />;
}

export function AppRoutes(): React.JSX.Element {
    return (
        <Suspense fallback={<SuspenseFallback />}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="meetings" element={<MeetingsPage />} />
                    <Route path="meetings/add" element={<AddMeetingPage />} />
                    <Route path="meetings/edit/:id" element={<EditMeetingPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
