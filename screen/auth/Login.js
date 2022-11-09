import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';
import globalStyles from '../../utils/globalStyles';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLogin = async () => {
    auth().signInWithEmailAndPassword(email, password);
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        placeholder="Email"
        style={globalStyles.primaryInput}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        value={password}
        placeholder="Password"
        style={globalStyles.primaryInput}
        onChangeText={text => setPassword(text)}
      />

      <Button title="Login" onPress={onLogin} />
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  touchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  dp: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
  },
});
