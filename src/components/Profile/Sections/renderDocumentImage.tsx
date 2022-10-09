import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IGetDocumentImages} from '../../../redux/Profile/types';
import FlipView from '../../backgrounds/FlipView';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FlipCard from 'react-native-flip-card';
import {ImagePickerResponse} from 'react-native-image-picker';
import {handleChoosePhoto} from '../../../utils/photos/handleFormdata';
import FastImage from 'react-native-fast-image';

const RenderDocumentImage = ({
  images,
  isEditModeEnabled,

  isImageFlipped,
  setisImageFlipped,
  setPhotos,
  setIsEditModeEnabled,
}: {
  isImageFlipped: boolean;
  isEditModeEnabled: boolean;
  images: IGetDocumentImages[] | undefined;
  setisImageFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  photos: ImagePickerResponse | null;
  setPhotos: React.Dispatch<React.SetStateAction<ImagePickerResponse | null>>;
  setIsEditModeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  {
    return !images ? (
      <FlipView
        shouldFlip={!isEditModeEnabled}
        onPress={async () => {
          handleChoosePhoto(setPhotos, setIsEditModeEnabled);
        }}
        image={require('../../../assets/utilityIcons/document.png')}
      />
    ) : !isEditModeEnabled ? (
      <TouchableOpacity
        onPress={() => setisImageFlipped(!isImageFlipped)}
        style={{borderRadius: 10, overflow: 'hidden'}}>
        <FlipCard flip={isImageFlipped} flipHorizontal>
          <FastImage
            style={{
              width: '100%',
              height: '100%',
              aspectRatio: 1.5,
              borderRadius: 15,
            }}
            source={{
              uri: 'http://146.59.13.245' + images[0]?.path,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <FastImage
            style={{
              width: '100%',
              height: undefined,
              borderRadius: 15,
              aspectRatio: 1.5,
            }}
            source={{
              uri: 'http://146.59.13.245' + images[1]?.path,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </FlipCard>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          handleChoosePhoto(setPhotos, setIsEditModeEnabled);
        }}>
        <FlipCard flip={isImageFlipped} flipHorizontal clickable={false}>
          <Image
            source={{
              uri: 'http://146.59.13.245' + images[0]?.path,
            }}
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1.5,
              resizeMode: 'contain',
            }}
          />
          <Image
            source={{uri: 'http://146.59.13.245' + images[1]?.path}}
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1.5,
              resizeMode: 'contain',
            }}
          />
        </FlipCard>
      </TouchableOpacity>
    );
  }
};

export default RenderDocumentImage;

const styles = StyleSheet.create({});
