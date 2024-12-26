import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomIndicatorProps } from '../types/common';

// return the value on the parent component
interface ControlPanelProps {
    onCultivationSelectorChange?: (cultivationCode: string) => void;
    onFormValuesChange?: (customIndicators: CustomIndicatorProps) => void;
    onDisconnect?: () => void;
    showControlForTab?: number;
}



function ControlPanel({ onCultivationSelectorChange, onFormValuesChange, onDisconnect, showControlForTab }: ControlPanelProps) {
    const { t } = useTranslation();

    // EVENTI
    const getCultivationCode = (cultivationCode: string) => {
        onCultivationSelectorChange && onCultivationSelectorChange(cultivationCode);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const payload = {} as CustomIndicatorProps;

        switch (name) {
            case 'customTemperature':
                payload.customTemperature = parseFloat(value);
                break;
            case 'customHumidity':
                payload.customHumidity = parseFloat(value);
                break;
            case 'customWindblow':
                payload.customWindblow = parseFloat(value);
                break;
            case 'customProductPrice':
                payload.customProductPrice = parseFloat(value);
                break;
            default:
                break;
        }

        onFormValuesChange && onFormValuesChange(payload);
    };

    const disconnect = () => {
        onDisconnect && onDisconnect();
    }

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
                        id="customTemperature-field"
                        name='customTemperature'
                        onChange={handleChange}
                        //value={formValues.customTemperature}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">mod(%)</InputAdornment>,
                            },
                        }}
                    />

                    <TextField
                        label={t("HUMIDITY_PERCENTAGE")}
                        id="customHumidity-field"
                        name='customHumidity'
                        // change only when the value is fully inserted
                        onChange={handleChange}
                        //value={formValues.customHumidity}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">mod(%)</InputAdornment>,
                            },
                        }}
                    />

                    <TextField
                        label={t("WINDBLOW_PERCENTAGE")}
                        id="customWindblow-field"
                        name='customWindblow'
                        // change only when the value is fully inserted
                        onChange={handleChange}
                        //value={formValues.customHumidity}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">mod(%)</InputAdornment>,
                            },
                        }}
                    />
                </>}


                {showControlForTab === 1 && <>
                    {/* put here other fields */}
                </>}

                {showControlForTab === 2 && <>
                    {/* put here other fields */}
                    <TextField
                        label={t("PRODUCT_PRICE")}
                        id="customProductPrice-field"
                        name='customProductPrice'
                        // change only when the value is fully inserted
                        onChange={handleChange}
                        //value={formValues.customHumidity}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">mod(%)</InputAdornment>,
                            },
                        }}
                    />
                    <TextField
                        label={t("WATER_PRICE")}
                        id="customWaterPrice-field"
                        name='customWaterPrice'
                        // change only when the value is fully inserted
                        onChange={handleChange}
                        //value={formValues.customHumidity}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">mod(%)</InputAdornment>,
                            },
                        }}
                    />
                    <TextField
                        label={t("ENERGY_PRICE")}
                        id="customEnergyPrice-field"
                        name='customEnergyPrice'
                        // change only when the value is fully inserted
                        onChange={handleChange}
                        //value={formValues.customHumidity}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">mod(%)</InputAdornment>,
                            },
                        }}
                    />
                </>}

                <Button variant="contained" onClick={disconnect}>{t("DISCONNECT")}</Button>
            </Box>
        </FormControl>
    );
}

export default ControlPanel;