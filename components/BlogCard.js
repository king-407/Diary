import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import globalStyles from '../utils/globalStyles';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';

const BlogCard = ({blogData, onModalOpen, moveToBlogScreen}) => {
  const {kahani, coverImage} = blogData;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => moveToBlogScreen(blogData)}>
      <TouchableWithoutFeedback>
        <Ionicons
          name="ios-ellipsis-vertical-circle"
          size={32}
          color="black"
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
          }}
          onPress={() => onModalOpen(blogData.id)}
        />
      </TouchableWithoutFeedback>

      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{uri: coverImage}}
          // placeholderStyle={{backgroundColor: 'transparent'}}
        />

        <Text style={styles.cardTitle}>{kahani}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width / 1.25,
    // backgroundColor: 'white',
    height: 200,
    marginVertical: 10,
  },
  profile: {
    position: 'absolute',
    right: 0,
    height: 20,
  },
  card: {
    height: '100%',
    width: '100%',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  cardTitle: {
    ...globalStyles.primaryText,
    color: 'white',
    padding: 10,
    fontSize: 26,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: 'rgba(0,0,0,0.81)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
