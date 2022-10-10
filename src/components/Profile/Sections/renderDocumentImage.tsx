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
    return !isEditModeEnabled ? (
      <TouchableOpacity
        onPress={() => setisImageFlipped(!isImageFlipped)}
        style={{borderRadius: 20, overflow: 'hidden'}}>
        <FlipCard flip={isImageFlipped} flipHorizontal>
          {images && images[0].path ? (
            <Image
              source={{
                uri:
                  'http://146.59.13.245' +
                  images[0]?.path +
                  '?' +
                  new Date().getTime(),
              }}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1.55,
                resizeMode: 'contain',
                borderRadius: 15,
              }}
            />
          ) : (
            <FlipView
              shouldFlip={!isEditModeEnabled}
              onPress={async () => {
                handleChoosePhoto(setPhotos, setIsEditModeEnabled);
              }}
              image={require('../../../assets/utilityIcons/document.png')}
            />
          )}

          {images && images[1].path ? (
            <Image
              source={{
                uri:
                  'http://146.59.13.245' +
                  images[1]?.path +
                  '?' +
                  new Date().getTime(),
              }}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1.55,
                resizeMode: 'contain',
                borderRadius: 15,
              }}
            />
          ) : (
            <FlipView
              shouldFlip={!isEditModeEnabled}
              onPress={async () => {
                handleChoosePhoto(setPhotos, setIsEditModeEnabled);
              }}
              image={require('../../../assets/utilityIcons/document.png')}
            />
          )}
        </FlipCard>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={{borderRadius: 15, overflow: 'hidden'}}
        onPress={() => {
          handleChoosePhoto(setPhotos, setIsEditModeEnabled);
        }}>
        <FlipCard flip={isImageFlipped} flipHorizontal clickable={false}>
          {images && images[0].path ? (
            <Image
              source={{
                uri:
                  'http://146.59.13.245' +
                  images[0]?.path +
                  '?' +
                  new Date().getTime(),
              }}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1.55,
                resizeMode: 'contain',
                borderRadius: 15,
                overflow: 'hidden',
              }}
            />
          ) : (
            <FlipView
              shouldFlip={!isEditModeEnabled}
              onPress={async () => {
                handleChoosePhoto(setPhotos, setIsEditModeEnabled);
              }}
              image={require('../../../assets/utilityIcons/document.png')}
            />
          )}
          {images && images[1].path ? (
            <Image
              source={{
                uri:
                  'http://146.59.13.245' +
                  images[1]?.path +
                  '?' +
                  new Date().getTime(),
              }}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1.55,
                resizeMode: 'contain',
                borderRadius: 15,
              }}
            />
          ) : (
            <FlipView
              shouldFlip={!isEditModeEnabled}
              onPress={async () => {
                handleChoosePhoto(setPhotos, setIsEditModeEnabled);
              }}
              image={require('../../../assets/utilityIcons/document.png')}
            />
          )}
        </FlipCard>
      </TouchableOpacity>
    );
  }
};

export default RenderDocumentImage;

const styles = StyleSheet.create({});
