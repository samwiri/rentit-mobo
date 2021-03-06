import React from 'react';
import { Text, View } from 'react-native';
import { Appbar, useTheme, Button, Paragraph, Menu, Divider } from 'react-native-paper';
import { tw } from 'react-native-tailwindcss';
import { Notifications } from '@/notifications';
import Tabs from './tabs';

export default ({ navigation }) => {
  const { fonts } = useTheme();

  return (
    <React.Fragment>
      <Appbar.Header>
        <Appbar.Content title="RENTIT" titleStyle={[fonts.medium]}></Appbar.Content>
        <Appbar.Action icon="magnify" onPress={() => console.log()} />
        <Appbar.Action icon="settings" onPress={() => navigation.navigate('Settings')} />
      </Appbar.Header>
      <Tabs />
    </React.Fragment>
  );
};
