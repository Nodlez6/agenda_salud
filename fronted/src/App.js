import { useEffect, useReducer } from "react";
import { authReducer } from "./auth/authReducer.js";
import { AuthContext } from "./auth/authContext";
import AppRouter from "./routes/AppRouter.js";
import "./Styles.css";
import "react-toastify/dist/ReactToastify.css";

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};
const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div>
      <AuthContext.Provider value={{ user, dispatch }}>
        <AppRouter />
      </AuthContext.Provider>
    </div>
  );
};

export default App;
