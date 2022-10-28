import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const AddImage = ({
  image,
  setImage,
}: {
  image: ImagePickerResponse | null;
  setImage: React.Dispatch<React.SetStateAction<ImagePickerResponse | null>>;
}) => {
  useEffect(() => {
    if (image && image.assets) console.log(image?.assets[0].uri);
  }, [image]);

  return (
    <TouchableOpacity
      onPress={async () => {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: 1,
          presentationStyle: 'currentContext',
        });
        setImage(result);
      }}
      style={{
        width: '50%',
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,.1)',
        borderRadius: 35,
        padding: 20,
      }}>
      {image && image.assets && (
        <Image
          style={{flex: 1, width: '100%', borderRadius: 25}}
          source={{uri: image?.assets[0].uri}}
        />
      )}
      {}
      {!image && (
        <Image
          style={{flex: 1, width: '100%', borderRadius: 50}}
          source={require('../../assets/utilityIcons/addImage.png')}
        />
      )}
    </TouchableOpacity>
  );
};

export default AddImage;

const styles = StyleSheet.create({});
