import React from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Link,
  Typography,
  Button,
} from "@material-ui/core";
import {
  logoutUser,
  getUserDetails,
  isLoggedIn,
  getUsername,
} from "../../APICalls/LoginHandler";
import SpaceElement from "../SpaceElement/SpaceElement";
import { Redirect } from "react-router-dom";

const backEndURLLOGIN = "http://localhost:8080/api/login";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  element: {
    margin: theme.spacing(2),
  },
}));

function Header(props) {
  const classes = useStyles();

  async function logOutUser() {
    await logoutUser();
    props.logoutHandler();
  }

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography className={classes.element}>
          <Button href="/" color="secondary">
            Codechef
          </Button>
        </Typography>
        <Typography className={classes.element}>
          <Button href="/contests" color="secondary">
            Contests
          </Button>
        </Typography>
        <SpaceElement />
        {(() => {
          let name = getUsername();
          if (name !== undefined) {
            return <Typography>{name}</Typography>;
          }
        })()}
        <Typography>
          {
            // conditionally render the login and logout buttons
            (() => {
              if (isLoggedIn()) {
                return (
                  <Button
                    color="inherit"
                    onClick={logOutUser}
                    className={classes.element}
                  >
                    {" "}
                    logout{" "}
                  </Button>
                );
              } else {
                return (
                  <Button
                    color="inherit"
                    href={backEndURLLOGIN}
                    className={classes.element}
                  >
                    {" "}
                    login{" "}
                  </Button>
                );
              }
            })()
          }
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
