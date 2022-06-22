import React, {Component, useState, useEffect, useCallback} from 'react';

import {
  Text,
  View,
  PanResponder,
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import {useDispatch, useSelector} from 'react-redux';

import * as userSelectors from '../store/user/selectors';
import * as userActions from '../store/user/actions';

const StatisticsScreen = props => {
  const dispatch = useDispatch();

  const [cryptos, setCryptos] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log('props', props);
  }, []);

  useEffect(() => {
    setCards(
      cryptos.map((unit, index) => {
        return (
          <View key={unit.id + index}>
            <TouchableOpacity
              onPress={() => {
                pushToStatisticScreen(unit);
              }}>
              <Text> {unit.name}</Text>
              <Text> {unit.symbol}</Text>
              <Text> {unit.price}</Text>
            </TouchableOpacity>
          </View>
        );
      }),
    );
  }, [cryptos]);

  const popScreen = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'DashboardScreen',
        options: {
          topBar: {
            visible: false,
            title: {
              text: 'DashboardScreen',
            },
          },
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topHeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              popScreen();
            }}>
            <Text>Back </Text>
          </TouchableOpacity>
          <Text style={styles.red}>Statistic</Text>
          {/* one icon */}
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.red}>
          Icon {props?.crypto?.symbol} {props?.crypto?.name}
        </Text>
        {/* <ScrollView horizontal={true}>{cards}</ScrollView> */}
        <Text style={styles.red}> Daily Change</Text>
        <Text style={styles.red}> High Price</Text>
        <Text style={styles.red}> Low Price</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <Text>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 20,
  },
  topHeaderContainer: {
    flexDirection: 'row',
  },
  topBodyContainer: {
    flexDirection: 'row',
    // paddingTop: 20,
  },
  bodyContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  bottomContainer: {
    flex: 2,
    paddingLeft: 20,
  },
});
export default StatisticsScreen;
