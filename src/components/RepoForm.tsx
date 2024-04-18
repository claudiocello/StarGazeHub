import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStargazersRequest} from '../store/slices/stargazersSlice';
import {AppState} from '../store/configureStore';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useTheme} from '../../ThemeContext';
import {darkTheme} from '../../themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import {Routes} from 'navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

const RepoForm: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<Routes>>();
  const [owner, setOwner] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const dispatch = useDispatch();
  const success = useSelector((state: AppState) => state.stargazer.success);
  const loading = useSelector((state: AppState) => state.stargazer.loading);
  const error = useSelector((state: AppState) => state.stargazer.error);
  const {theme} = useTheme();
  const darkBackgroundImage = require('../../assets/LogoStarGazerHub-preview.png');
  const lightBackgroundImage = require('../../assets/LogoStarGazerHub-Dark-preview.png');
  const backgroundImage =
    theme === darkTheme ? lightBackgroundImage : darkBackgroundImage;

  useFocusEffect(
    useCallback(() => {
      setOwner('');
      setRepo('');
    }, []),
  );

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: error,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  }, [error]);

  const handleFetchStargazers = () => {
    dispatch(fetchStargazersRequest({owner, repo}));
  };

  const handleSettingsNavigation = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    if (!loading && success) {
      navigation.navigate('StargazersList', {owner, repo});
    }
  }, [loading, success, navigation]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <TouchableOpacity
          onPress={handleSettingsNavigation}
          style={styles.settingsButton}>
          <Icon name="cog" size={24} color={theme.text} />
        </TouchableOpacity>
        <Image
          source={backgroundImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={[styles.label, {color: theme.text}]}>
          Repository Owner:
        </Text>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: theme.secondary, color: theme.text},
          ]}
          onChangeText={(text: string) => {
            const trimmedText = text.replace(/\s/g, '');
            setOwner(trimmedText);
          }}
          value={owner}
          placeholderTextColor={'#ded9ca'}
          placeholder="Enter GitHub user/organization"
        />
        <Text style={[styles.label, {color: theme.text}]}>
          Repository Name:
        </Text>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: theme.secondary, color: theme.text},
          ]}
          onChangeText={(text: string) => {
            const trimmedText = text.replace(/\s/g, '');
            setRepo(trimmedText);
          }}
          value={repo}
          placeholderTextColor={'#ded9ca'}
          placeholder="Enter repository name"
        />
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.primary}]}
          onPress={handleFetchStargazers}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Get Stargazers'}
          </Text>
          {loading && (
            <ActivityIndicator
              color={theme.text}
              size="small"
              style={styles.activityIndicator}
            />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    width: '100%',
    marginBottom: 5,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  activityIndicator: {
    marginLeft: 5,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
    padding: 10,
  },
  image: {
    width: '60%',
    aspectRatio: 1,
    marginBottom: 20,
  },
});

export default RepoForm;
