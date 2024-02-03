import React from 'react'
import Table from '../../../molecules/Table/Table'
import Label from '../../../atoms/Label/Label'
import AssetLogo from '../../../molecules/Swap/AssetLogo'

function TokensRow({token, index}) {
  return (
    <Table.Row>
      <Label>{index + 1}</Label>
      <AssetLogo src={token.logo} alt="tokenLogo" />
      <Label color="white" fontSize="1rem">
        {token.name}
      </Label>
      <Label>{token.symbol}</Label>
      <Label>{token.balance}</Label>
    </Table.Row>
  );
}

export default TokensRow