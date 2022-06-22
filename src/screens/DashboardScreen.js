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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

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
          <View key={unit.id + index} style={styles.trendingCardContainer}>
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
          <Text style={styles.topHeaderText}>Current balance</Text>
          <View style={styles.topHeaderIconContainer}>
            <View style={styles.topHeaderIcon}>
              <MaterialCommunityIcons
                name="robot-excited-outline"
                size={styles.topIcon.size}
                color={styles.topIcon.color}
              />
            </View>
            <View style={styles.topHeaderIcon}>
              <MaterialCommunityIcons
                name="bell-badge"
                size={styles.topIcon.size}
                color={styles.topIcon.color}
              />
            </View>
          </View>
        </View>
        <View style={styles.topBodyContainer}>
          <Text style={styles.topHeaderNumber}>$7,540.00</Text>
          {/* drop down currency */}
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyHeaderText}>Trending</Text>
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
    backgroundColor: '#24242B',
  },
  topContainer: {
    height: heightPercentageToDP('20%'),
    paddingTop: heightPercentageToDP('8%'),
    paddingLeft: widthPercentageToDP('4.5%'),
  },
  topHeaderContainer: {
    flexDirection: 'row',
  },
  topHeaderText: {
    paddingTop: heightPercentageToDP('.75%'),
    fontSize: heightPercentageToDP('2%'),
    color: '#777881',
    fontWeight: 'bold',
  },
  topHeaderIconContainer: {
    flexDirection: 'row',
    paddingLeft: widthPercentageToDP('30.5%'),
  },
  topHeaderIcon: {
    paddingLeft: widthPercentageToDP('5.5%'),
  },
  topIcon: {
    size: heightPercentageToDP('3.5%'),
    color: 'white',
  },
  topHeaderNumber: {
    fontSize: heightPercentageToDP('3%'),
    color: 'white',
    fontWeight: 'bold',
  },
  topBodyContainer: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  line: {
    height: heightPercentageToDP('.2%'),
    width: widthPercentageToDP('90%'),
    marginLeft: widthPercentageToDP('5%'),
    backgroundColor: '#2E3038',
  },

  bodyContainer: {
    height: heightPercentageToDP('40%'),
    paddingTop: heightPercentageToDP('1.5%'),
    paddingLeft: widthPercentageToDP('4.5%'),
  },
  bodyHeaderText: {
    fontSize: heightPercentageToDP('3.5%'),
    color: 'white',
  },
  trendingCardContainer: {
    height: heightPercentageToDP('20%'),
    width: widthPercentageToDP('20%'),
    marginTop: heightPercentageToDP('1.5%'),
    marginLeft: widthPercentageToDP('4.5%'),
    backgroundColor: '#363842',
  },
  bottomContainer: {
    flex: 2,
    paddingLeft: 20,
  },
});
export default DashboardScreen;
