import React from 'react';
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';

// return the value on the parent component
interface ControlPanelProps {
  onCultivationSelectorChange: (cultivationCode: string) => void;
  showControlForTab: number;
}

interface FormValues {
    temperature: string;
    humidity: string;
    water: string;
}

function ControlPanel({ onCultivationSelectorChange, showControlForTab }: ControlPanelProps) {
    const [formValues, setFormValues] = React.useState({} as FormValues);

    const getCultivationCode = (cultivationCode: string) => {
        onCultivationSelectorChange(cultivationCode);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // useEffect(() => {
    //     console.log("il tab è cambiato", showControlForTab);
    // }, [showControlForTab]);

    return (
        <FormControl fullWidth>
            <Box display="flex" flexDirection="column" gap={2}>
                <InputLabel id="cereal">Cereale</InputLabel>
                <Select
                    labelId="cereal"
                    id="cereal-dropdown"
                    label="Cerale"
                    defaultValue={"MAIS"}
                    onChange={(e) => getCultivationCode(e.target.value)}
                >
                    <MenuItem value={"MAIS"}>Mais (Zea mays)</MenuItem>
                    <MenuItem value={"SEGALE"}>Segale (Secale cereale)</MenuItem>
                    <MenuItem value={"GRANO_TENERO"}>Grano tenero (Triticum aestivum)</MenuItem>
                    <MenuItem value={"ORZO"}>Orzo (Hordeum vulgare)</MenuItem>
                </Select>

                {/* TAB 0 - COND. Climatiche */}
                {showControlForTab === 0 && <>
                    <TextField
                        label="Temperatura"
                        id="temperature-field"
                        name='temperature'
                        onChange={handleChange}
                        value={formValues.temperature}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                            },
                        }}
                    />

                    <TextField
                        label="Perc. Umidità"
                        id="humidity-field"
                        name='humidity'
                        onChange={handleChange}
                        value={formValues.humidity}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            },
                        }}
                    />

                    <TextField
                        label="Q.tà Acqua"
                        id="water-field"
                        name='water'
                        value={formValues.water}
                        onChange={handleChange}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">mm (l/m²)</InputAdornment>,
                            },
                        }}
                    />
                </>}


                {showControlForTab === 1 && <>
                    {/* put here other fields */}
                </>}

                {showControlForTab === 2 && <>
                    {/* put here other fields */}
                </>}
               
            </Box>
        </FormControl>
    );
}

export default ControlPanel;