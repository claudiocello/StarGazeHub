import React, {useState} from 'react';
import {View, Switch, Text, TouchableOpacity, Platform} from 'react-native';
import {useTheme} from '../../ThemeContext';
import {lightTheme, darkTheme} from '../../themes';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {appVersion} from '../../env';

const SettingsComponent = () => {
  const navigation = useNavigation();
  const {theme, setTheme} = useTheme();
  const [isEnabled, setIsEnabled] = useState(theme === darkTheme);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setTheme(isEnabled ? lightTheme : darkTheme);
  };

  const handleBackNavigation = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}>
      <TouchableOpacity
        onPress={handleBackNavigation}
        style={styles.backButton}>
        <Icon name="arrow-left" size={24} color={theme.text} />
      </TouchableOpacity>
      <Text style={{color: theme.text, marginBottom: 20}}>
        Toggle Dark/Light Theme
      </Text>
      <Switch
        trackColor={{false: darkTheme.secondary, true: lightTheme.secondary}}
        thumbColor={isEnabled ? darkTheme.primary : lightTheme.primary}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={{color: theme.text, marginTop: 20}}>
        App Version: {appVersion}
      </Text>
    </View>
  );
};

const styles = {
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999,
    padding: 10,
  },
};

export default SettingsComponent;
