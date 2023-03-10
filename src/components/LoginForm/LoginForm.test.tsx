import React from "react";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { screen } from "@testing-library/react-native";
import LoginForm from "./LoginForm";
import { type UserCredentials } from "../../hooks/useUser/types";
import renderWithProviders from "../../utils/renderWithProviders";
import StackNavigator from "../../routes/StackNavigator/StackNavigator";
import Routes from "../../routes/routes";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockedLoginUser = jest.fn();

jest.mock("../../hooks/useUser/useUser", () => () => ({
  loginUser: mockedLoginUser,
}));

const mockNavigation = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ navigate: mockNavigation }),
}));

const registerRoute = Routes.register;

const mockUserCredentials: UserCredentials = {
  username: "marc10",
  password: "marc12345",
};

describe("Given a LoginForm component", () => {
  describe("When rendered", () => {
    test("Then it should show a `Log in` title", async () => {
      const titleText = "Log in";

      renderWithProviders(<LoginForm />);

      const title = await screen.getByTestId(titleText);

      expect(title).toBeOnTheScreen();
    });

    test("Then it should show two inputs corresponding to username and password fields", async () => {
      const usernameLabelText = "enter username";
      const passwordLabelText = "enter password";

      renderWithProviders(<LoginForm />);

      const usernameInput = await screen.getByLabelText(usernameLabelText);
      const passwordInput = await screen.getByLabelText(passwordLabelText);

      expect(usernameInput).toBeOnTheScreen();
      expect(passwordInput).toBeOnTheScreen();
    });
  });

  describe("When rendered and the user enters their credentials `marc10` and `marc12345`and clicks on the submit button", () => {
    test("Then the credentials should show on the inputs and the loginUser function should be called", async () => {
      const usernameLabelText = "enter username";
      const passwordLabelText = "enter password";
      const buttonText = "press to log in";

      renderWithProviders(<LoginForm />);

      const usernameInput = await screen.getByLabelText(usernameLabelText);
      const passwordInput = await screen.getByLabelText(passwordLabelText);
      const submitButton = await screen.getByRole("button");

      await waitFor(async () => {
        fireEvent.changeText(usernameInput, mockUserCredentials.username);
        fireEvent.changeText(passwordInput, mockUserCredentials.password);
      });

      expect(usernameInput.props.value).toBe(mockUserCredentials.username);
      expect(passwordInput.props.value).toBe(mockUserCredentials.password);

      await waitFor(async () => {
        fireEvent.press(submitButton);
      });

      expect(mockedLoginUser).toHaveBeenCalledWith(mockUserCredentials);
    });
  });

  describe("When the `Join now` button is pressed", () => {
    test("Then it should call the useNavigation to redirect the user to the RegisterScreen", async () => {
      const redirectButtonText = "Join now";

      renderWithProviders(<StackNavigator />);
      const redirectButton = await screen.getByText(redirectButtonText);

      fireEvent.press(redirectButton);

      expect(mockNavigation).toHaveBeenCalledWith(registerRoute);
    });
  });
});
