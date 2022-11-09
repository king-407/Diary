import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import globalStyles from '../../utils/globalStyles';

const Blog = ({route, navigation}) => {
  const {content, coverImage, kahani} = route.params.blogData;
  return (
    <ScrollView style={globalStyles.primaryContainer}>
      <StatusBar hidden />
      {coverImage ? (
        <Image style={styles.image} source={{uri: coverImage}} />
      ) : null}
      <Text>{kahani}</Text>
    </ScrollView>
  );
};

export default Blog;
const styles = StyleSheet.create({
  image: {
    width: '90%',
    height: 200,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
});
