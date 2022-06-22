/**
 * @format
 */

import React, {useState, useEffect, useCallback} from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
// import {AppRegistry} from 'react-native';
// import App from './App';
import DashboardScreen from './src/screens/DashboardScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import configureStore from './configureStore';
const store = configureStore();

Navigation.registerComponent(
  'StatisticsScreen',
  () => props =>
    (
      <Provider store={store}>
        <StatisticsScreen {...props} />
      </Provider>
    ),
  () => StatisticsScreen,
);

Navigation.registerComponent(
  'DashboardScreen',
  () => props =>
    (
      <Provider store={store}>
        <DashboardScreen {...props} />
      </Provider>
    ),
  () => DashboardScreen,
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'DashboardScreen',
                  },
                },
              ],
              options: {
                topBar: {
                  visible: 'false',
                  title: {
                    text: 'StatisticsScreen',
                  },
                },
                bottomTab: {
                  text: 'Screen 1',
                  // icon: Icon.getImageSource('user', 20, 'red'),
                  badge: '1',
                  options: {
                    backgroundColor: '#282A34',
                  },
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'DashboardScreen',
                  },
                },
              ],
              options: {
                topBar: {
                  visible: 'false',
                  title: {
                    text: 'DashboardScreen',
                  },
                },
                bottomTab: {
                  text: 'Screen 2',
                  badge: '2',
                  options: {
                    backgroundColor: '#282A34',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
});
