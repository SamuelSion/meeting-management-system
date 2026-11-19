import { Outlet } from "react-router-dom";
import { Header } from "./header";
import "./layout.css";

export function Layout(): React.JSX.Element {
    return (
        <div className="app-layout">
            <Header />
            <main className="app-layout__main">
                <Outlet />
            </main>
            <footer className="app-layout__footer">
                יומן פגישות &copy; {new Date().getFullYear()}
            </footer>
        </div>
    );
}
