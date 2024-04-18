import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {AppState} from '../store/configureStore';
import {Stargazer} from '../models/Stargazer';
import {
  fetchStargazersRequest,
  resetStargazersState,
} from '../store/slices/stargazersSlice';
import {useTheme} from '../../ThemeContext';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  StargazersList: {owner: string; repo: string};
};

const StargazersList: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StargazersList'>>();
  const {owner, repo} = route.params;
  const stargazers = useSelector(
    (state: AppState) => state.stargazer.stargazers,
  );
  const navigation = useNavigation();
  const loadingMore = useSelector(
    (state: AppState) => state.stargazer.loadingMore,
  );
  const loading = useSelector((state: AppState) => state.stargazer.loading);
  const error = useSelector((state: AppState) => state.stargazer.error);
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const {theme} = useTheme();

  useEffect(() => {
    return () => {
      dispatch(resetStargazersState());
    };
  }, [dispatch]);

  const handleBackNavigation = () => {
    navigation.goBack();
  };

  const handleLoadMore = () => {
    if (!loadingMore && !loading) {
      console.log('Initiating Load More');
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        dispatch(fetchStargazersRequest({owner, repo, page: nextPage}));
        return nextPage;
      });
    }
  };

  const renderItem = ({item}: {item: Stargazer}) => (
    <View style={[styles.item, {borderBottomColor: theme.text}]}>
      <Image source={{uri: item.avatar_url}} style={styles.avatar} />
      <Text style={[styles.username, {color: theme.text}]}>{item.login}</Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <TouchableOpacity
        onPress={handleBackNavigation}
        style={[styles.backButton, {backgroundColor: theme.primary}]}>
        <Icon name="close" size={24} color={'white'} />
      </TouchableOpacity>
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={stargazers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={{backgroundColor: theme.background, marginTop: 40}}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator color={theme.text} size="large" />
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default StargazersList;
