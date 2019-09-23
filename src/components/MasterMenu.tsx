import { Dashboard } from "@material-ui/icons";
import { Menu, MenuItemRouterLink } from "@vivid-planet/react-admin-mui";
import * as React from "react";

export default function MasterMenu() {
    return (
        <Menu>
            <MenuItemRouterLink text="Dashboard" icon={<Dashboard />} to="/dashboard" />
        </Menu>
    );
}
