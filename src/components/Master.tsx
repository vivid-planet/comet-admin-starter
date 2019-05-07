import { CssBaseline, Grid, IconButton, Theme, Toolbar, Typography } from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import { MenuContext } from "@vivid-planet/react-admin-mui";
import MenuComponent from "app/components/Menu";
import * as React from "react";
import { compose } from "recompose";
import { Header } from "./Master.sc";

class Master extends React.Component<WithStyles<typeof styles>> {
    public readonly state = {
        open: true,
    };

    public render() {
        const { classes, children } = this.props;
        const { open } = this.state;

        return (
            <MenuContext.Provider
                value={{
                    open,
                    toggleOpen: this.toggleOpen,
                }}
            >
                <Grid container wrap="nowrap">
                    <CssBaseline />
                    <Header position="fixed" className={classes.appBar} color="primary">
                        <Toolbar disableGutters={true}>
                            <IconButton color="inherit" onClick={this.toggleOpen}>
                                <Menu />
                            </IconButton>
                            <Typography variant="h5" color="inherit">
                                React Admin Starter
                            </Typography>
                        </Toolbar>
                    </Header>
                    <MenuComponent open={this.state.open} closeMenu={this.toggleOpen} />
                    <Grid container component="main" wrap="nowrap" direction="column" alignItems="stretch" className={classes.grid}>
                        {children}
                    </Grid>
                </Grid>
            </MenuContext.Provider>
        );
    }

    private toggleOpen = () => {
        this.setState({ open: !this.state.open });
    };
}

const styles = (theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        grid: {
            padding: "0 30px",
        },
    });

const enhance = compose<WithStyles<typeof styles>, {}>(withStyles(styles));

export default enhance(Master);
