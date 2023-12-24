import React from 'react'
import Label from '../../atoms/Label/Label';
import { useEnsName } from 'wagmi';
import CircularIndeterminate from '../../atoms/Loader/loader';
import toast from 'react-hot-toast';

function GetEnsName({ address }) {
    
    const { data, isError, isLoading } = useEnsName({
        address: address,
    });

    isLoading && <CircularIndeterminate />
    isError && toast.error(isError.message);
  return (
    <Label
      style={{
        fontSize: ".95rem",
        color: "white",
      }}
    >
      {data || address}
    </Label>
  );
}

export default GetEnsName