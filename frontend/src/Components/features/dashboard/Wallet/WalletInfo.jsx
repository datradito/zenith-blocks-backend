import React from 'react'
import GetEnsName from '../../../molecules/GetEnsName/GetEnsName';
import Avatar from '@mui/material/Avatar';

const WalletInfo = ({ address, ensData }) => (
  <>
    <Avatar
      sx={{ width: 50, height: 50 }}
      src={ensData || "https://i.imgur.com/6Z4X6XK.png"}
    />
    <GetEnsName address={address} />
  </>
);

export default WalletInfo