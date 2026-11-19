import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import "./index.css";
import { AppRoutes } from "./routes/app-routes";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <CssBaseline />
            <AppRoutes />
        </BrowserRouter>
    </StrictMode>
);
