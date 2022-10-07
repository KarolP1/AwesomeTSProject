import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {IGetProfileInfo} from '../../redux/Profile/types';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {WEBCONST} from '../../constants/webConstants';
import {useAppDispatch} from '../../redux/hooks';
import {addMyProfileImage} from '../../redux/Profile/core/profileAddImageProfile.thunk';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

const ImageController = ({user}: {user?: IGetProfileInfo | null}) => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bacgroundImage, setBacgroundImage] =
    useState<DocumentPickerResponse>();
  const [frontImage, setFrontImage] = useState<DocumentPickerResponse>();
  // useEffect(() => {
  //   if (bacgroundImage) console.log(bacgroundImage);
  //   console.log(bacgroundImage);
  //   dispatch(addMyProfileImage({bacground: bacgroundImage}));
  //   setBacgroundImage(undefined);
  // }, [ImageBackground]);
  const handleDocumentSelection = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        //There can me more options as well
      });
      // //Printing the log realted to the file
      // console.log('res : ' + JSON.stringify(res));
      // console.log('URI : ' + res[0].uri);
      // console.log('Type : ' + res[0].type);
      // console.log('File Name : ' + res[0].name);
      // console.log('File Size : ' + res[0].size);
      //Setting the state to show single file attributes
      setBacgroundImage(res[0]);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        Alert.alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }, []);

  console.log(user?.images?.backgroundImage);
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(!modalVisible)}
      activeOpacity={0.9}
      style={{
        backgroundColor: '#464646',
        height: 150,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginVertical: 10,
      }}>
      <>
        {user?.images?.backgroundImage && (
          <Image
            style={{flex: 1, resizeMode: 'cover', width: '100%'}}
            source={{
              uri: `${WEBCONST().APIURL}${user?.images?.backgroundImage}`,
            }}
          />
        )}
      </>
      <View>
        <View
          style={{
            backgroundColor: '#EA3651',
            height: 90,
            aspectRatio: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 100,
          }}></View>
        <Text
          style={{
            textTransform: 'capitalize',
            color: '#fff',
            fontSize: 20,
            marginTop: 10,
            fontWeight: '700',
          }}>
          {user?.first_name} {user?.last_name}
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Hi {user?.first_name} {user?.last_name}!
            </Text>
            <Pressable
              style={[styles.button, styles.actionButton]}
              onPress={handleDocumentSelection}>
              <Text style={styles.textStyle}>Add Profile picture</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.actionButton]}
              onPress={handleDocumentSelection}>
              <Text style={styles.textStyle}>Add Background picture</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyleButtonClose}>close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ImageController;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  actionButton: {
    backgroundColor: '#EA3651',
    marginBottom: 5,
  },
  buttonClose: {
    borderColor: '#EA3651',
    borderWidth: 1,
    marginBottom: 5,
  },
  textStyleButtonClose: {
    color: '#EA3651',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
