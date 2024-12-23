import React, { useEffect } from 'react';
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

// return the value on the parent component
interface ControlPanelProps {
  onCultivationSelectorChange?: (cultivationCode: string) => void;
  onFormValuesChange?: (formValues: FormValues) => void;
  showControlForTab?: number;
}

interface FormValues {
    temperature: string;
    humidity: string;
}

function ControlPanel({ onCultivationSelectorChange, onFormValuesChange, showControlForTab }: ControlPanelProps) {
    const [formValues, setFormValues] = React.useState({ temperature: '', humidity: '' } as FormValues);
    const { t } = useTranslation();

    const getCultivationCode = (cultivationCode: string) => {
        onCultivationSelectorChange && onCultivationSelectorChange(cultivationCode);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(() => {
        onFormValuesChange && onFormValuesChange(formValues);
    }, [formValues]);

    return (
        <FormControl fullWidth>
            <Box display="flex" flexDirection="column" gap={2}>
                <InputLabel id="cultivation">{t("CULTIVATION")}</InputLabel>
                <Select
                    labelId="cultivation"
                    id="cultivation-dropdown"
                    label={t("CULTIVATION")}
                    defaultValue={"MAIZE"}
                    onChange={(e) => getCultivationCode(e.target.value)}
                >
                    <MenuItem value={"MAIZE"}>Mais (Zea mays)</MenuItem>
                    <MenuItem value={"RYE"}>Segale (Secale cereale)</MenuItem>
                    <MenuItem value={"SOFT_WHEAT"}>Grano tenero (Triticum aestivum)</MenuItem>
                    <MenuItem value={"BARLEY"}>Orzo (Hordeum vulgare)</MenuItem>
                </Select>

                {/* TAB 0 - COND. Climatiche */}
                {showControlForTab === 0 && <>
                    <TextField
                        label={t("TEMPERATURE")}
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
                        label={t("HUMIDITY_PERCENTAGE")}
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