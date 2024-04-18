import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RepoForm from '../src/components/RepoForm';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import stargazersReducer from '../src/store/slices/stargazersSlice';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

jest.mock('../ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      background: '#FFFFFF',
      text: '#000000',
      primary: '#FDB813',
      secondary: '#FFFFFF',
    },
  }),
}));
// Creazione dello store Redux per il testing
const rootReducer = combineReducers({
  stargazer: stargazersReducer,
});
const store = createStore(rootReducer);

// Setup per la navigazione
const Stack = createStackNavigator();
function MockNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RepoForm" component={RepoForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

describe('RepoForm', () => {
  it('renders correctly and allows text input', () => {
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <MockNavigation>
          <RepoForm />
        </MockNavigation>
      </Provider>,
    );

    const ownerInput = getByPlaceholderText('Enter GitHub user/organization');
    const repoInput = getByPlaceholderText('Enter repository name');
    fireEvent.changeText(ownerInput, 'openai');
    fireEvent.changeText(repoInput, 'gpt-3');

    expect(ownerInput.props.value).toBe('openai');
    expect(repoInput.props.value).toBe('gpt-3');

    const button = getByText('Get Stargazers');
    fireEvent.press(button);
  });
});
