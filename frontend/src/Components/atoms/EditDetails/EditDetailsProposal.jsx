import * as React from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import ButtonAtom from '../Button';

let dialogContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: alpha('#1a1c1e', 0.9), // Make the dialog modal look darker
    alignItems: 'center',
    border: '2px solid #2C2C2C',
    zIndex: 9999,
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)', // Set a high z-index value to make sure it overlays other content
};

let dialogContentStyle = {
    width: '400px',
    backgroundColor: alpha('#0D0E10', 1),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
    borderRadius: '8px',
    fontSize: '1rem',
    padding: '16px',
    '& .MuiFormControl-root': {
        width: '100%',
        color: "white",
    },
    '& .MuiControlInput-root': {
        color: "white",
    },
};

export default function DetailPanelContent({ row, onClose }) {
    console.log(row);
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({
        defaultValues: row,
        mode: 'onChange',
    });


    const [dialogOpen, setDialogOpen] = React.useState(true);

    const onSubmit = (data) => {
        //graphQl query to backend to apend amount into proposal - this endpoint should also handle saving the same data into ipfs.
        console.log(data);
        setDialogOpen(false); // Close the dialog after submitting the form
    };

    const buttonConfig = {
        variant: 'outlined',
        size: 'small',
        label: 'Save',
        innerText: 'Save',
        onClick: onSubmit,
    };

    return (
        <Box style={{ ...dialogContainerStyle, display: dialogOpen ? 'flex' : 'none' }}>
            <div style={dialogContentStyle}>
                <Stack component="form" justifyContent="space-between" onSubmit={handleSubmit(onSubmit)}>
                    <Typography
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                        }}
                        variant="subtitle">
                        {`#${row.title}`}
                    </Typography>
                    <Controller
                        control={control}
                        name="amount"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                label="Amount"
                                // size="small"
                                // m='1rem'
                                InputProps={{
                                    style: {
                                        color: 'white',
                                        border: '2px solid #2C2C2C',
                                        // backgroundColor: '#1A1C1E',
                                    },
                                }}
                                required
                                fullWidth {...field}
                            />
                        )}
                    />
                    <div>
                        <ButtonAtom config={buttonConfig} />
                    </div>
                </Stack>
            </div>
        </Box>
    );
}
