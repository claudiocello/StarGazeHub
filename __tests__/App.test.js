import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);
    expect(getByText('Repository Owner:')).toBeDefined(); // Verifica che "Repository Owner:" sia renderizzato
    expect(getByText('Get Stargazers')).toBeDefined(); // Verifica che il pulsante "Get Stargazers" sia renderizzato
  });
});
