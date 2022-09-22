import { makeStyles } from "@material-ui/core/styles";

const StyleRegister = makeStyles((theme) => ({
  cardRegister: {
    height: "100%",
    width: "100%",
    maxWidth: "32rem",
    maxHeight: "40rem",
    textAlign: "center",
    padding: "1.2rem",
    // eslint-disable-next-line
    ["@media (min-width:400px)"]: {
      width: "80%",
    },
  },
  inputRegister: {
    width: "100%",
    actions: {
      select: {
        color: "red",
      },
    },
  },
  buttonRegister: {
    backgroundColor: "red",
  },
}));

export default StyleRegister;
