import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomIndicatorProps } from '../types/common';
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DEFAULT_CULTIVATION_TYPE } from '../app.env';

interface ControlPanelProps {
    onCultivationSelectorChange?: (cultivationCode: string) => void;
    onFormValuesChange?: (customIndicators: CustomIndicatorProps) => void;
    onReset?: () => void;
    onDisconnect?: () => void;
    showControlForTab?: number;
}

function ControlPanel({ onCultivationSelectorChange, onFormValuesChange, onReset, onDisconnect, showControlForTab }: ControlPanelProps) {
    const { t } = useTranslation();

    const getCultivationCode = (cultivationCode: string) => {
        onCultivationSelectorChange && onCultivationSelectorChange(cultivationCode);
    }

    const resetDashboard = () => {
        onReset && onReset();
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
                    <MenuItem value={"MAIZE"}>{t("MAIS_CULTIVATION")}</MenuItem>
                    <MenuItem value={"RYE"}>{t("RYE_CULTIVATION")}</MenuItem>
                    <MenuItem value={"SOFT_WHEAT"}>{t("SOFT_WHEAT_CULTIVATION")}</MenuItem>
                    <MenuItem value={"BARLEY"}>{t("BARLEY_CULTIVATION")}</MenuItem>
                </Select>

                {/* TAB 0 - COND. Climatiche */}
                {showControlForTab === 0 && <>
                    <TextField
                        label={t("TEMPERATURE")}
                        id="customTemperature-field"
                        name='customTemperature'
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">mod(%)</InputAdornment>,
                            },
                        }}
                    />
                </>}


                {showControlForTab === 1 && <> </>}

                {showControlForTab === 2 && <>
                    <TextField
                        label={t("PRODUCT_PRICE")}
                        id="customProductPrice-field"
                        name='customProductPrice'
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        type='number'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">mod(%)</InputAdornment>,
                            },
                        }}
                    />
                </>}
                <Button variant="contained" onClick={resetDashboard}>{t("RESET")}</Button>
                <Button variant="contained" onClick={disconnect}>{t("DISCONNECT")}</Button>
            </Box>
        </FormControl>
    );
}

export default ControlPanel;