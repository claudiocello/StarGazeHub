import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

let reactotron;
if (process.env.NODE_ENV !== 'test') {
  reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({name: 'React Native Demo'})
    .useReactNative()
    .use(reactotronRedux())
    .connect();

  console.tron = Reactotron;
}

export default reactotron;
