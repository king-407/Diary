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
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [dp, setDp] = useState();
  const onPick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      data => setDp(data.assets[0].uri),
    );
  };
  const onClick = () => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      data => setDp(data.assets[0].uri),
    );
  };
  const onRegister = async () => {
    if (!email && !password) {
      return;
    }
    try {
      const {
        user: {uid},
      } = await auth().createUserWithEmailAndPassword(email, password);
      let downloadURL = null;
      if (dp) {
        const splitPath = dp.split('/');
        const imageName = splitPath[splitPath.length - 1];
        const reference = storage().ref(`${uid}/photu/${imageName}`); //CREATING PATH//
        const data = await reference.putFile(dp); //url me data daalte hue;
        // console.log(data);
        downloadURL = await storage()
          .ref(data.metadata.fullPath)
          .getDownloadURL();
      }
      console.log(email, name, downloadURL);
      firestore()
        .collection('users')
        .doc(uid)
        .set({email, name, dp: downloadURL})
        .then(() => console.log('Done'));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={{uri: !dp ? null : dp}} style={styles.dp} />
      <View style={styles.touchContainer}>
        <TouchableOpacity onPress={onPick}>
          <Text>Pick Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClick}>
          <Text>Click Picture</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={name}
        placeholder="Name"
        style={globalStyles.primaryInput}
        onChangeText={text => setName(text)}
      />

      <TextInput
        value={email}
        placeholder="Email"
        style={globalStyles.primaryInput}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        value={password}
        placeholder="Pssword"
        style={globalStyles.primaryInput}
        onChangeText={text => setPassword(text)}
      />

      <Button title="Register" onPress={onRegister} />
    </View>
  );
};

export default Register;
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
