import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Platform} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/configureStore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RepoForm from './src/components/RepoForm';
import StargazersList from './src/components/StargazersList';
import Settings from './src/components/Settings';
import Toast from 'react-native-toast-message';
import {ThemeProvider, useTheme} from './ThemeContext';
import {Routes} from './src/navigation/types';

const Stack = createStackNavigator<Routes>();

const MainApp = () => {
  const {theme} = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'RepoForm'}>
            <Stack.Screen
              name={'RepoForm'}
              component={RepoForm}
              options={{title: 'Repository Form'}}
            />
            <Stack.Screen
              name={'StargazersList'}
              component={StargazersList}
              options={{title: 'Stargazers List', presentation: 'modal'}}
            />
            <Stack.Screen
              name={'Settings'}
              component={Settings}
              options={{title: 'Settings'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </Provider>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
