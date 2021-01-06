import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "clear_err_msg":
      return { ...state, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { errorMessage: "", token: null };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({
      type: "signin",
      payload: token,
    });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

const clearErrMsg = (dispatch) => () => {
  dispatch({ type: "clear_err_msg" });
};
const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup", payload: response.data.token });

    // navigate to main flow
    navigate("TrackList");
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: "add_error",
      payload: "Oops! Something went wrong with sign up",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });

    // navigate to main flow
    // Need to use the naviagate function to navigate between pages outside of the components.
    navigate("TrackList");
  } catch (err) {
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Oops! Something went wrong with sign in",
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrMsg, tryLocalSignin },
  { token: null, errorMessage: "" }
);
