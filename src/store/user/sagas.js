import Axios from 'axios';
import {
  all,
  call,
  put,
  takeLatest,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

import {Navigation} from 'react-native-navigation';

// const checkUCMPolicyByUsername = function* ({payload}) {
//   try {
//     const headerParams = {
//       mode: 'cors',
//       credentials: 'same-origin',
//       headers: {'Content-Type': 'application/json'},
//     };

//     const response = yield call(
//       Axios.post,
//       backend_url + '/api/auth/router/checkUCMPolicyByUsername/',
//       payload.user,
//       headerParams,
//     );

//     if (response.data.auth == 'success') {
//       console.log('in success');

//       yield put(actions.setPhoneNumberInputError(''));

//       Navigation.push(payload.props, {
//         component: {
//           name: 'EnterConfirmationCodeScreen',
//           options: {
//             topBar: {
//               visible: 'false',
//               title: {
//                 text: 'EnterConfirmationCodeScreen',
//               },
//             },
//           },
//           passProps: {
//             number: payload.user.userProps.number,
//             cognitoUser: payload.user.userProps.cognitoUser,
//             isRegisteredUser: payload.user.userProps.isRegisteredUser,
//           },
//         },
//       });
//     } else {
//       console.log('in error');
//       const error = response.data.error;
//       yield put(actions.setPhoneNumberInputError(error));
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

export default function* UserSaga() {
  yield all([
    // takeLatest(
    //   actionTypes.CHECK_UCMPOLICY_BY_USERNAME,
    //   checkUCMPolicyByUsername,
    // ),
  ]);
}
