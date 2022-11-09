import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import globalStyles from '../utils/globalStyles';

const ModalView = ({onPressHandlers}) => {
  const {OnUpdateBlog, OnCloseModal} = onPressHandlers;
  return (
    <View style={styles.container}>
      <View style={styles.modalViewContainer}>
        <TouchableOpacity style={styles.touchableBtn} onPress={OnUpdateBlog}>
          <Text style={globalStyles.btnText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableBtn} onPress={OnUpdateBlog}>
          <Text style={globalStyles.btnText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableBtn} onPress={OnCloseModal}>
          <Text style={globalStyles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalView;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableBtn: {
    ...globalStyles.primaryTouchableBtn,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  modalViewContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 500,
    padding: 10,
    width: '85%',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    elevation: 10,
  },
});
