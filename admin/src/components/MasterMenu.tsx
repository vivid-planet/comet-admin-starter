import { Menu, MenuItemRouterLink } from "@comet/admin";
import { Dashboard } from "@material-ui/icons";
import * as React from "react";

export default function MasterMenu() {
    return (
        <Menu>
            <MenuItemRouterLink text="Dashboard" icon={<Dashboard />} to="/dashboard" />
        </Menu>
    );
}
