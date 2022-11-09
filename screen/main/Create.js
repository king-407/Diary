import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import auth from '@react-native-firebase/auth';
import globalStyles from '../../utils/globalStyles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
let oldCoverImageURL;
const Create = ({route, navigation}) => {
  const [content, SetContent] = useState('');
  const [coverImage, setImage] = useState(null);
  const [kahani, setKahani] = useState(null);
  let id = route.params?.id;
  const uid = auth().currentUser.uid;
  function onUploadImage() {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      data => setImage(data.assets[0].uri),
    );
  }

  const onCheck = () => {
    if (id) onUpdate(id);
    else onCreate(uid);
  };
  useEffect(() => {
    if (id) {
      getBlogData(id);
    }
  }, []);

  const onUploadCoverImage = async uid => {
    const splitPath = coverImage.split('/');
    const imageName = splitPath[splitPath.length - 1];
    const reference = storage().ref(`/${uid}/photu/${imageName}`);
    const data = await reference.putFile(coverImage);
    return await storage().ref(data.metadata.fullPath).getDownloadURL();
  };

  const onCreate = async uid => {
    ///  CREATING  DATA FOR DATABASE///
    if (!kahani && !content) {
      return Alert.alert('warning !!', 'ok');
    }
    navigation.navigate('Home');
    try {
      const downloadURL = await onUploadCoverImage(uid);
      console.log('hi');
      firestore().collection('userBlog').doc(uid).collection('blogs').add({
        content,
        coverImage: downloadURL,
        kahani,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  function getBlogData(id) {
    firestore()
      .collection('userBlog')
      .doc(uid)
      .collection('blogs')
      .doc(id)
      .get()
      .then(snapshot => {
        const data = snapshot.data();
        setKahani(data.kahani);
        SetContent(data.content);
        setImage(data.coverImage);
        oldCoverImageURL = data.coverImage;
      });
  }
  const onUpdate = async id => {
    navigation.navigate('Home');
    try {
      let downloadURL = oldCoverImageURL;

      if (oldCoverImageURL !== coverImage) {
        downloadURL = await onUploadCoverImage(uid);
      }

      firestore()
        .collection('userBlog')
        .doc(uid)
        .collection('blogs')
        .doc(id)
        .update({
          kahani,
          content,
          coverImage: downloadURL,
          lastUpdate: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView style={globalStyles.primaryContainer}>
      <Text style={{margin: 10}}>Create a blog</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={2}
          value={content}
          onChangeText={text => SetContent(text)}></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Kahani</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={10}
          value={kahani}
          onChangeText={text => setKahani(text)}
          underlineColorAndroid="transparent"></TextInput>
      </View>
      <View style={{flexDirection: 'row', margin: 20}}>
        <Image
          style={styles.image}
          source={{uri: coverImage}}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.touchabelBtn} onPress={onUploadImage}>
          <Text style={globalStyles.btnText}>Upload Cover Image</Text>
        </TouchableOpacity>
      </View>

      <FontAwesome
        name="check-circle"
        color="purple"
        size={44}
        style={styles.uploadBtn}
        onPress={onCheck}
      />
    </ScrollView>
  );
};
export default Create;
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 2,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    margin: 10,
    fontFamily: 'Nunito-Regular',
  },
  touchabelBtn: {
    ...globalStyles.primaryTouchableBtn,
    width: 200,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  uploadBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    elevation: 10,
  },
});
