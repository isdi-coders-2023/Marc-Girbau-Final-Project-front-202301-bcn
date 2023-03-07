import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { type UserCredentials } from "../../hooks/useUser/types";
import useUser from "../../hooks/useUser/useUser";
import loginFormStyles from "./LoginFormStyles";

const LoginForm = (): JSX.Element => {
  const { loginUser } = useUser();

  const initialUserCredentials: UserCredentials = {
    username: "",
    password: "",
  };

  const [userCredentials, setUserCredentials] = useState(
    initialUserCredentials
  );

  const handleFieldChange = (introducedValue: string, field: string) => {
    setUserCredentials({ ...userCredentials, [field]: introducedValue });
  };

  const onSubmitHandler = async () => {
    const userToLogin: UserCredentials = {
      username: userCredentials.username,
      password: userCredentials.password,
    };

    await loginUser(userToLogin);
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={loginFormStyles.container}>
        <Text style={loginFormStyles.title}>Log in</Text>
        <View style={loginFormStyles.formContainer}>
          <View>
            <Text style={loginFormStyles.label}>Username</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={loginFormStyles.input}
              maxLength={20}
              value={userCredentials.username}
              onChangeText={(inputValue) => {
                handleFieldChange(inputValue, "username");
              }}
            />
          </View>
          <View>
            <Text style={loginFormStyles.label}>Password</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              style={loginFormStyles.input}
              textContentType="password"
              maxLength={20}
              value={userCredentials.password}
              onChangeText={(inputValue) => {
                handleFieldChange(inputValue, "password");
              }}
            />
          </View>
        </View>
        <View style={loginFormStyles.buttonLinkContainer}>
          <TouchableOpacity
            style={loginFormStyles.button}
            onPress={onSubmitHandler}
          >
            <Text style={loginFormStyles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <View style={loginFormStyles.linkContainer}>
            <Text style={loginFormStyles.info}>Not a member?</Text>
            <TouchableOpacity>
              <Text style={loginFormStyles.link}>Join now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;