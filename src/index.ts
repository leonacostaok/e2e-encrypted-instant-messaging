import { getAccount, initializeAccount } from './account-tools';

initializeAccount('iamaseed', 'iamapassword').then((res) => {
  return res.privateExtendedKey;
});

// getAccount('iamapassword').then((res) => {
//   console.log(res.privateExtendedKey);
// });
