import { AppBar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import "./header.css";

const navLinks = [
    { to: "/", label: "בית", end: true },
    { to: "/meetings", label: "פגישות", end: true },
    { to: "/meetings/add", label: "הוספת פגישה", end: false },
    { to: "/about", label: "אודות", end: false }
];

export function Header(): React.JSX.Element {
    return (
        <AppBar position="sticky" className="app-header" elevation={0}>
            <Toolbar className="app-header__toolbar">
                <NavLink to="/" className="app-header__brand">
                    <GroupsIcon className="app-header__brand-icon" />
                    <span className="app-header__brand-title">יומן פגישות</span>
                </NavLink>

                <nav className="app-header__nav">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) =>
                                isActive
                                    ? "app-header__nav-link app-header__nav-link--active"
                                    : "app-header__nav-link"
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </Toolbar>
        </AppBar>
    );
}
