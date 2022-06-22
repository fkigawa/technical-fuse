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
  const [trendingCards, setTrendingCards] = useState([]);

  const [portfolioCards, setPortfolioCards] = useState([]);

  useEffect(() => {
    setCryptos([
      {
        id: '1',
        name: 'Bitcoin',
        icon: 'testIcon',
        symbol: 'BTC',
        price: 40389.5,
        dailyChange: 4.09,
        isPositiveChange: false,
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
        isPositiveChange: true,
        highPrice: 32012,
        lowPrice: 29365,
      },
    ]);
  }, []);

  useEffect(() => {
    setTrendingCards(
      cryptos.map((unit, index) => {
        return (
          <View key={unit.id + index} style={styles.trendingCardContainer}>
            <TouchableOpacity
              onPress={() => {
                pushToStatisticScreen(unit);
              }}>
              <View style={styles.trendingCardHeaderContainer}>
                <View style={styles.trendingCardIcon}></View>
                <View style={styles.trendingCardHeaderRightContainer}>
                  <Text style={styles.trendingCardSymbolText}>
                    {' '}
                    {unit.symbol}
                  </Text>
                  <Text style={styles.trendingCardNameText}> {unit.name}</Text>
                </View>
              </View>
              <View style={styles.trendingCardBodyContainer}>
                <Text style={styles.trendingCardPrice}> ${unit.price}</Text>
                <Text
                  style={
                    unit.isPositiveChange
                      ? [styles.trendingCardDailyChange, {color: '#538E6F'}]
                      : [styles.trendingCardDailyChange, {color: '#903D4D'}]
                  }>
                  {' '}
                  {unit.isPositiveChange ? '+' : '-'}
                  {unit.dailyChange}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }),
    );

    setPortfolioCards(
      cryptos.map((unit, index) => {
        return (
          <TouchableOpacity
            key={unit.id + index}
            onPress={() => {
              pushToStatisticScreen(unit);
            }}>
            <View style={styles.portfolioCardContainer}>
              <View style={styles.portfolioCardHeaderContainer}>
                <View style={styles.portfolioCardWrapper}>
                  <View style={styles.portfolioCardIcon}></View>
                </View>
                <View style={styles.portfolioCardHeaderRightContainer}>
                  <Text style={styles.portfolioCardSymbolText}>
                    {' '}
                    {unit.symbol}
                  </Text>
                  <Text style={styles.portfolioCardNameText}> {unit.name}</Text>
                </View>
              </View>
              <View style={styles.portfolioCardBodyContainer}>
                <Text style={styles.portfolioCardPrice}> ${unit.price}</Text>
                <Text
                  style={
                    unit.isPositiveChange
                      ? [styles.portfolioCardDailyChange, {color: '#538E6F'}]
                      : [styles.portfolioCardDailyChange, {color: '#903D4D'}]
                  }>
                  {' '}
                  {unit.isPositiveChange ? '+' : '-'}
                  {unit.dailyChange}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
                size={styles.topIconOne.size}
                color={styles.topIconOne.color}
              />
            </View>
            <View style={styles.topHeaderIcon}>
              <MaterialCommunityIcons
                name="bell-badge"
                size={styles.topIconOne.size}
                color={styles.topIconOne.color}
              />
            </View>
          </View>
        </View>
        <View style={styles.topBodyContainer}>
          <Text style={styles.topBodyNumber}>$7,540.00</Text>
          <View style={styles.topBodyCurrencyContainer}>
            <Text style={styles.topBodyCurrencyText}>USD</Text>
            <View style={styles.topBodyIcon}>
              <MaterialCommunityIcons
                name="chevron-down"
                size={styles.topIconTwo.size}
                color={styles.topIconTwo.color}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyHeaderText}>Trending</Text>
        <ScrollView horizontal={true}>{trendingCards}</ScrollView>
        <Text style={styles.bottomHeaderText}> My Portfolio</Text>
        <ScrollView>{portfolioCards}</ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomNavIcon}>
          <MaterialCommunityIcons
            name="home"
            size={styles.bottomIcon.size}
            color={styles.bottomIcon.color}
          />
        </View>
        <View style={styles.bottomNavIcon}>
          <MaterialCommunityIcons
            name="chart-box"
            size={styles.bottomIconInactive.size}
            color={styles.bottomIconInactive.color}
          />
        </View>
        <View style={styles.bottomNavIcon}>
          <MaterialCommunityIcons
            name="swap-vertical"
            size={styles.bottomIconInactive.size}
            color={styles.bottomIconInactive.color}
          />
        </View>
        <View style={styles.bottomNavIcon}>
          <MaterialCommunityIcons
            name="cart"
            size={styles.bottomIconInactive.size}
            color={styles.bottomIconInactive.color}
          />
        </View>
        <View style={styles.bottomNavIcon}>
          <MaterialCommunityIcons
            name="account"
            size={styles.bottomIconInactive.size}
            color={styles.bottomIconInactive.color}
          />
        </View>
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
  topIconOne: {
    size: heightPercentageToDP('3.5%'),
    color: 'white',
  },

  topBodyContainer: {
    flexDirection: 'row',
    paddingTop: heightPercentageToDP('2%'),
  },
  topBodyNumber: {
    fontSize: heightPercentageToDP('3%'),
    color: 'white',
    fontWeight: 'bold',
  },
  topBodyCurrencyContainer: {
    flexDirection: 'row',
    marginTop: heightPercentageToDP('.65%'),
    paddingTop: heightPercentageToDP('.3%'),
    paddingLeft: widthPercentageToDP('.5%'),
    height: heightPercentageToDP('2.5%'),
    width: widthPercentageToDP('15%'),
    marginLeft: widthPercentageToDP('2.5%'),
    backgroundColor: '#2E3038',
    borderRadius: heightPercentageToDP('3%'),
  },
  topIconTwo: {
    size: heightPercentageToDP('1.5%'),
    color: '#777881',
  },
  topBodyIcon: {
    paddingTop: heightPercentageToDP('.15%'),
    paddingLeft: widthPercentageToDP('1.3%'),
  },

  topBodyCurrencyText: {
    marginLeft: widthPercentageToDP('1%'),
    fontSize: heightPercentageToDP('1.5%'),
    color: '#777881',
    fontWeight: 'bold',
  },

  line: {
    height: heightPercentageToDP('.2%'),
    width: widthPercentageToDP('90%'),
    marginLeft: widthPercentageToDP('5%'),
    backgroundColor: '#2E3038',
  },

  bodyContainer: {
    height: heightPercentageToDP('67.5%'),
    paddingTop: heightPercentageToDP('1.5%'),
    paddingLeft: widthPercentageToDP('4.5%'),
  },
  bodyHeaderText: {
    fontSize: heightPercentageToDP('3.5%'),
    color: 'white',
  },
  trendingCardContainer: {
    height: heightPercentageToDP('20%'),
    width: widthPercentageToDP('33%'),
    marginTop: heightPercentageToDP('1.5%'),
    marginLeft: widthPercentageToDP('3.5%'),
    borderRadius: heightPercentageToDP('1.5%'),
    backgroundColor: '#363842',
  },
  trendingCardHeaderContainer: {
    flexDirection: 'row',
  },
  trendingCardIcon: {
    height: heightPercentageToDP('4%'),
    width: heightPercentageToDP('4%'),
    margin: heightPercentageToDP('1%'),
    borderRadius: heightPercentageToDP('5%'),
    backgroundColor: '#42444E',
  },
  trendingCardHeaderRightContainer: {
    marginTop: heightPercentageToDP('1.25%'),
    marginLeft: widthPercentageToDP('.5%'),
  },
  trendingCardSymbolText: {
    fontSize: heightPercentageToDP('1.5%'),
    fontWeight: 'bold',
    color: 'white',
  },
  trendingCardNameText: {
    fontSize: heightPercentageToDP('1.5%'),
    color: '#777881',
  },
  trendingCardBodyContainer: {
    margin: heightPercentageToDP('.75%'),
  },
  trendingCardPrice: {
    fontSize: heightPercentageToDP('2%'),
    color: 'white',
  },
  trendingCardDailyChange: {
    marginTop: heightPercentageToDP('.5%'),
    fontSize: heightPercentageToDP('1.5%'),
    fontWeight: 'bold',
    // color: 'white',
  },

  portfolioCardContainer: {
    height: heightPercentageToDP('10%'),
    width: widthPercentageToDP('80%'),
    marginTop: heightPercentageToDP('1.5%'),
    marginLeft: widthPercentageToDP('3.5%'),
    borderRadius: heightPercentageToDP('1.5%'),
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  portfolioCardHeaderContainer: {
    flexDirection: 'row',
    width: widthPercentageToDP('40%'),
    // alignItems: 'flex-start',
    // backgroundColor: '#363842',
  },
  portfolioCardWrapper: {
    height: heightPercentageToDP('6%'),
    width: heightPercentageToDP('6%'),
    margin: heightPercentageToDP('.5%'),
    backgroundColor: '#363842',
    borderRadius: heightPercentageToDP('1%'),
  },
  portfolioCardIcon: {
    height: heightPercentageToDP('4%'),
    width: heightPercentageToDP('4%'),
    margin: heightPercentageToDP('1%'),
    borderRadius: heightPercentageToDP('5%'),
    backgroundColor: '#42444E',
  },
  portfolioCardHeaderRightContainer: {
    marginTop: heightPercentageToDP('1.25%'),
    marginLeft: widthPercentageToDP('.5%'),
  },
  portfolioCardSymbolText: {
    fontSize: heightPercentageToDP('1.5%'),
    fontWeight: 'bold',
    color: 'white',
  },
  portfolioCardNameText: {
    marginTop: heightPercentageToDP('.5%'),
    fontSize: heightPercentageToDP('1.5%'),
    color: '#777881',
  },
  portfolioCardBodyContainer: {
    alignItems: 'flex-end',
    width: widthPercentageToDP('40%'),
    margin: heightPercentageToDP('.75%'),
    marginRight: widthPercentageToDP('5%'),
  },
  portfolioCardPrice: {
    fontSize: heightPercentageToDP('2%'),
    color: 'white',
  },
  portfolioCardDailyChange: {
    marginTop: heightPercentageToDP('.5%'),
    fontSize: heightPercentageToDP('1.5%'),
    fontWeight: 'bold',
    // color: 'white',
  },

  bottomContainer: {
    height: heightPercentageToDP('15%'),
    width: widthPercentageToDP('100%'),
    backgroundColor: '#282A34',
    flexDirection: 'row',
  },
  bottomNavIcon: {
    paddingTop: heightPercentageToDP('3%'),
    paddingLeft: widthPercentageToDP('10%'),
  },
  bottomIcon: {
    size: heightPercentageToDP('3.5%'),
    color: 'white',
  },
  bottomIconInactive: {
    size: heightPercentageToDP('3.5%'),
    color: 'grey',
  },
  bottomHeaderText: {
    fontSize: heightPercentageToDP('3.5%'),
    color: 'white',
  },
});
export default DashboardScreen;
