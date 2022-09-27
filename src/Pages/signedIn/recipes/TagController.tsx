import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputRecipe from '../../../components/TextInputs/TextInputRecipe';
import DelleteDot from '../../../components/Icons/delleteDot';

const TagController = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [tag, setTag] = useState<string>('');

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
      }}>
      {tags?.length !== 0 &&
        tags.map((tag, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.15)',
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              marginVertical: 5,
            }}>
            <Text key={index} style={{color: 'white', marginVertical: 5}}>
              #{tag}
            </Text>
            <DelleteDot
              onPress={() => {
                const filteredTags = tags.filter(tagItem => tagItem !== tag);
                setTags(filteredTags);
              }}
            />
          </View>
        ))}
      <Text style={{color: '#fff', fontSize: 20, marginVertical: 5}}>
        Add Tag
      </Text>
      <TextInputRecipe
        name="tag"
        placeholder="Tags will help you reach more people"
        value={tag}
        onChange={setTag}
        type={'string'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#EA3651',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            width: '50%',
          }}
          onPress={async () => {
            if (tag === '') Alert.alert('Warning', 'You have to type tag');
            else {
              setTags([...tags, tag]);
              setTag('');
            }
          }}>
          <Text style={{color: '#fff'}}>Add new tag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TagController;

const styles = StyleSheet.create({});
