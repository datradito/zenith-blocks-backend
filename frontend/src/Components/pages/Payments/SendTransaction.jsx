import * as React from 'react'
import { useDebounce } from 'use-debounce'
import {
    usePrepareSendTransaction,
    useSendTransaction,
    useWaitForTransaction,
} from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@mui/material'
import { TextField, Typography } from '@mui/material'


const componentStyles = {
    formInputFieldStyles: {
        color: 'white',
        padding: '0',
        border: ".08rem #2c2c2c solid",
        borderRadius: '5px',
        backgroundColor: "rgba(40, 42, 46, 0.2)",
        margin: '0 0 1rem 0',

        '& .MuiInputBase-input': {
            padding: '0.5rem',
            color: 'white',
            borderRadius: '5px',
            fontSize: '.85rem',
            fontWeight: 'small',
        },

        '& .MuiInputBase-root': {
            padding: '0',
        },
        '& .MuiSvgIcon-root': {
            color: 'white',
        },
    },
    typographyLabel: {
        color: 'gray',
        fontSize: ".80rem",
        marginBottom: ".5rem",
    },
    boxStyles: {
        display: "flex",
        flexDirection: "column",
        margin: "0rem auto",
        textAlign: 'left',
        borderBottom: '.05rem #2C2C2C solid',
    },
    containerStyles: {
        padding: '2rem ',
    },

}

export function SendTransaction() {
    const [to, setTo] = React.useState('')
    const [debouncedTo] = useDebounce(to, 500)

    const [amount, setAmount] = React.useState('')
    const [debouncedAmount] = useDebounce(amount, 500)

    const { config } = usePrepareSendTransaction({
        to: debouncedTo,
        value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
    })
    const { data, sendTransaction } = useSendTransaction(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    const handlePayment = (e) => {
        e.preventDefault()
        sendTransaction?.()
    }

    return (
        <form
            onSubmit={(e) => {
                handlePayment(e);
            }}
        >
            {/* <input
                aria-label="Recipient"
                onChange={(e) => setTo(e.target.value)}
                placeholder="0xA0Cf…251e"
                value={to}
            /> */}
            <Typography variant="h6"
                sx={componentStyles.typographyLabel}
            >Recipient</Typography>
            <TextField
                name="Recipient"
                required
                value={to}
                type="text"
                onChange={(e) => setTo(e.target.value)}
                fullWidth
                sx={componentStyles.formInputFieldStyles}
            />
            {/* <input
                aria-label="Amount (ether)"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.05"
                value={amount}
            /> */}
            <Typography variant="h6"
                sx={componentStyles.typographyLabel}
                >Amount</Typography>
            <TextField
                name="Amount"
                required
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                sx={componentStyles.formInputFieldStyles}
            />
            <Button
                sx={{
                    backgroundColor: "#055FFC",
                    margin: "1rem 0",
                    borderRadius: "50px",
                    fontSize: ".85rem",
                    textTransform: "none",
                    maxWidth: "10rem",
                    color: "white",
                }}
                onClick={handlePayment}
                disabled={isLoading || !sendTransaction || !to || !amount}
            >
                {isLoading ? 'Sending...' : 'Pay Invoice'}
            </Button>
            {isSuccess && (
                <div>
                    Successfully sent {amount} ether to {to}
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}
        </form>
    )
}
