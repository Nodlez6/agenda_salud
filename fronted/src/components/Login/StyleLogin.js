import { makeStyles } from "@material-ui/core/styles";

const StyleLogin = makeStyles((theme) => ({
  cardLogin: {
    height: "100%",
    width: "100%",
    maxWidth: "25rem",
    maxHeight: "25rem",
    textAlign: "center",
    // eslint-disable-next-line
    ["@media (min-width:400px)"]: {
      width: "80%",
    },
  },
  inputLogin: {
    width: "100%",
    actions: {
      select: {
        color: "red",
      },
    },
  },
  buttonlogin: {
    backgroundColor: "red",
  },
}));

export default StyleLogin;
