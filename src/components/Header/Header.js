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
    //props.logoutHandler();
  }

  return (
    <AppBar position="static" className={classes.root} color="inherit">
      <Toolbar>
        <Typography className={classes.element}>
          <Button variant="contained" href="/" color="primary">
            Codechef
          </Button>
        </Typography>
        <Typography className={classes.element}>
          <Button variant="contained" href="/contests" color="primary">
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
        <Typography className={classes.element}>
          {
            // conditionally render the login and logout buttons
            (() => {
              if (isLoggedIn()) {
                return (
                  <Button
                    color="secondary"
                    onClick={logOutUser}
                    variant="contained"
                  >
                    {" "}
                    logout{" "}
                  </Button>
                );
              } else {
                return (
                  <Button
                    color="secondary"
                    href={backEndURLLOGIN}
                    variant="contained"
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
