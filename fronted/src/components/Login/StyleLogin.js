import { makeStyles } from "@material-ui/core/styles";

const StyleLogin = makeStyles((theme) => ({
  cardLogin: {
    height: "100%",
    width: "100%",
    maxWidth: "30rem",
    maxHeight: "30rem",
    textAlign: "center",
    padding: "1.2rem",
    // eslint-disable-next-line
    ["@media (min-width:400px)"]: {
      width: "80%",
      padding: ".5rem",
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
