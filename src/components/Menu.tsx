import { Drawer, Theme } from "@material-ui/core";
import Dashboard from "@material-ui/icons/Dashboard";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import { MenuItemRouterLink } from "@vivid-planet/react-admin-mui";
import classNames from "classnames";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as sc from "./Menu.sc";

interface IProps {
    open: boolean;
    closeMenu: () => void;
}

const Menu = ({ classes, open }: WithStyles<typeof styles, true> & RouteComponentProps & IProps) => {
    return (
        <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: classNames(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
            open={open}
        >
            <sc.MenuItemsWrapper>
                <div className={classes.toolbar} />
                <MenuItemRouterLink text="Dashboard" icon={<Dashboard />} to="/dashboard" />
            </sc.MenuItemsWrapper>
        </Drawer>
    );
};

const styles = (theme: Theme) =>
    createStyles({
        drawer: {
            width: theme.appDrawer.width,
        },
        drawerOpen: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: "hidden",
            width: 60,
        },
        toolbar: theme.mixins.toolbar,
    });

const enhance = compose<WithStyles<typeof styles, true> & RouteComponentProps, IProps>(
    withStyles(styles, { withTheme: true }),
    withRouter,
);

export default enhance(Menu);
