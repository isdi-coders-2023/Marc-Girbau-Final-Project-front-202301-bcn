import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_URL_API } from "@env";
import { useAppDispatch } from "../../store/hooks";
import {
  type UserRegisterCredentials,
  type LoginResponse,
  type UserCredentials,
} from "./types";
import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";
import {
  activateModalActionCreator,
  setIsLoadingActionCreator,
  unsetIsLoadingActionCreator,
} from "../../store/features/uiSlice/uiSlice";
import Routes from "../../navigation/routes";
import { type LoginScreenNavigationProp } from "../../types/navigation.types";
import decodeToken from "../../utils/decodeToken";

const urlRoutes = {
  users: "users/",
  login: "login/",
  register: "register/",
};

interface UseUserStructure {
  loginUser: (userCredentials: UserCredentials) => Promise<void>;
  registerUser: (registerCredentials: UserRegisterCredentials) => Promise<void>;
}

const useUser = (): UseUserStructure => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const loginUser = async (userCredentials: UserCredentials) => {
    try {
      dispatch(setIsLoadingActionCreator());

      const response = await axios.post<LoginResponse>(
        `${REACT_APP_URL_API}${urlRoutes.users}${urlRoutes.login}`,
        userCredentials
      );

      const { token } = response.data;
      const userToLogin = decodeToken(token);

      dispatch(loginUserActionCreator(userToLogin));
      dispatch(unsetIsLoadingActionCreator());

      await AsyncStorage.setItem("token", token);

      navigation.navigate(Routes.home);
    } catch {
      dispatch(unsetIsLoadingActionCreator());

      dispatch(
        activateModalActionCreator({
          isError: true,
          modal: "Wrong credentials",
        })
      );
    }
  };

  const registerUser = async (registerCredentials: UserRegisterCredentials) => {
    try {
      dispatch(setIsLoadingActionCreator());

      await axios.post(
        `${REACT_APP_URL_API}${urlRoutes.users}${urlRoutes.register}`,
        registerCredentials
      );

      dispatch(unsetIsLoadingActionCreator());

      dispatch(
        activateModalActionCreator({
          isError: false,
          modal: "Your user has been created",
        })
      );

      navigation.navigate(Routes.login);
    } catch {
      dispatch(unsetIsLoadingActionCreator());

      dispatch(
        activateModalActionCreator({
          isError: true,
          modal: "Something went wrong, please try again",
        })
      );
    }
  };

  return { loginUser, registerUser };
};

export default useUser;
