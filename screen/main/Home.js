import {View, Text, Modal, StyleSheet, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import globalStyles from '../../utils/globalStyles';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BlogCard from '../../components/BlogCard';
import ModalView from '../../components/ModalView';
import {ScrollView} from 'react-native-gesture-handler';
const Home = ({navigation}) => {
  const [blogs, setBlogs] = useState([]); //to store blogs//
  const [pro, setP] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState([]); //to get specefic card we will have this card id//\
  const [data, setData] = useState({});
  const getBlogData = () => {
    // fetching data //
    firestore()
      .collection('userBlog')
      .doc(auth().currentUser.uid)
      .collection('blogs')
      .onSnapshot(query => {
        // console.log(query);
        let data = [];
        query.forEach(documentSnapshot => {
          // console.log(documentSnapshot);
          data.push({...documentSnapshot.data(), id: documentSnapshot.id});
        });
        setBlogs(data);
      });
  };
  const onModalOpen = cardId => {
    setModalOpen(true);
    setSelectedCardId(cardId); // to call various functions from here we need the card's id//
  };
  const OnCloseModal = () => {
    setModalOpen(false);
    setSelectedCardId(null);
  };
  // const OnViewBlog = () => {
  //   moveToBlogScreen(blogData);
  // };
  const OnUpdateBlog = () => {};
  const OnDeleteBlog = () => {};
  function moveToBlogScreen(blogData) {
    navigation.navigate('Blog', {
      blogData,
    });
  }
  const getProfileData = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        setP(querySnapshot._data.dp);
      });
  };

  useEffect(() => {
    getBlogData();
  }, []);
  useEffect(() => {
    getProfileData();
    console.log(pro);
  }, []);

  const renderItem = ({item}) => {
    return (
      <BlogCard
        blogData={item}
        moveToBlogScreen={moveToBlogScreen}
        onModalOpen={onModalOpen}
      />
    );
  };

  return (
    <View style={globalStyles.primaryContainer}>
      <Modal visible={modalOpen} animationType="fade" transparent={true}>
        <ModalView onPressHandlers={{OnUpdateBlog, OnCloseModal}} />
      </Modal>
      <View style={styles.header}>
        <Text>My Blogs</Text>
        <Image style={styles.profile} source={{uri: pro}} />
      </View>

      <Ionicons
        style={styles.addIcon}
        name="add-circle-sharp"
        size={54}
        color="black"
        onPress={() => {
          navigation.navigate('Create');
        }}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={blogs}
          keyExtractor={item => item.id}
          renderItem={renderItem}></FlatList>
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  profile: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  header: {
    flexDirection: 'row',
  },
  addIcon: {position: 'absolute', bottom: 10, left: '45%'},
});
