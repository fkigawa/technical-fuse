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

const DashboardScreen = props => {
  const dispatch = useDispatch();

  const [cryptos, setCryptos] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCryptos([
      {
        id: '1',
        name: 'Bitcoin',
        icon: 'testIcon',
        symbol: 'BTC',
        price: 40389.5,
        dailyChange: 4.09,
        highPrice: 41029,
        lowPrice: 39874,
      },
      {
        id: '2',
        name: 'Ethereum',
        icon: 'testIcon',
        symbol: 'ETH',
        price: 30002.5,
        dailyChange: 1.09,
        highPrice: 32012,
        lowPrice: 29365,
      },
    ]);
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

  const pushToStatisticScreen = crypto => {
    Navigation.push(props.componentId, {
      component: {
        name: 'StatisticsScreen',
        options: {
          topBar: {
            visible: 'false',
            title: {
              text: 'StatisticsScreen',
            },
          },
          bottomTabs: {
            visible: false,
          },
        },
        passProps: {
          crypto: crypto,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topHeaderContainer}>
          <Text style={styles.red}>Current balance</Text>
          {/* two icons */}
        </View>
        <View style={styles.topBodyContainer}>
          <Text style={styles.red}>$7,540.00</Text>
          {/* drop down currency */}
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.red}>Trading</Text>
        <ScrollView horizontal={true}>{cards}</ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.red}> My Portfolio</Text>
        <ScrollView>{cards}</ScrollView>
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
    paddingTop: 20,
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
export default DashboardScreen;
