import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowRightFromBracket,
  faGamepad,
  faBookmark,
  faCirclePlus,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import Routes from "../routes";
import ExploreScreen from "../../views/ExploreScreen/ExploreScreen";
import globalStyles from "../../styles/globalStyles";
import colorStyles from "../../theme/colors";
import bottomTabNavigatorStyles from "./BottomTabNavigatorStyles";
import { useAppDispatch } from "../../redux/hooks";
import { logoutUserActionCreator } from "../../redux/features/user/userSlice";
import { type LoginScreenNavigationProp } from "../../types/navigation.types";
import { resetToInitialStateActionCreator } from "../../redux/features/ui/uiSlice";

const BottomTabNavigator = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const dispatch = useAppDispatch();

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const logoutHandler = async () => {
    dispatch(resetToInitialStateActionCreator());
    dispatch(logoutUserActionCreator());

    navigation.navigate(Routes.login);
  };

  const renderFontAesomeIcon = (
    icon: IconDefinition,
    size: number,
    color: string
  ): JSX.Element => <FontAwesomeIcon icon={icon} color={color} size={size} />;

  return (
    <Tab.Navigator
      initialRouteName={Routes.explore}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorStyles.accent,
        tabBarInactiveTintColor: colorStyles.secondary,
        tabBarStyle: bottomTabNavigatorStyles.tabNavigator,
        tabBarLabelStyle: bottomTabNavigatorStyles.tabLabel,
      }}
      sceneContainerStyle={globalStyles.screen}
    >
      <Tab.Screen
        name={Routes.explore}
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) =>
            renderFontAesomeIcon(faGamepad, size, color),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={Routes.create}
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) =>
            renderFontAesomeIcon(faCirclePlus, size, color),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={Routes.myLibrary}
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) =>
            renderFontAesomeIcon(faBookmark, size, color),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={Routes.logout}
        component={ExploreScreen}
        listeners={{ tabPress: logoutHandler }}
        options={{
          tabBarIcon: ({ color, size }) =>
            renderFontAesomeIcon(faArrowRightFromBracket, size, color),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
