import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';

// return the value on the parent component
interface ControlPanelProps {
  onCultivationSelectorChange: (cultivationCode: string) => void;
}

function ControlPanel({ onCultivationSelectorChange }: ControlPanelProps) {

    const getCultivationCode = (cultivationCode: string) => {
        onCultivationSelectorChange(cultivationCode);
    }

    return (
        <FormControl fullWidth>
            <Box display="flex" flexDirection="column" gap={2}>
                <InputLabel id="label-raccolto">Raccolto</InputLabel>
                <Select
                    labelId="label-raccolto"
                    id="dropdown-raccolto"
                    label="Raccolto"
                    defaultValue={"MAIS"}
                    onChange={(e) => getCultivationCode(e.target.value)}
                >
                    <MenuItem value={"MAIS"}>Mais (Zea mays)</MenuItem>
                    <MenuItem value={"SEGALE"}>Segale (Secale cereale)</MenuItem>
                    <MenuItem value={"GRANO_TENERO"}>Grano tenero (Triticum aestivum)</MenuItem>
                    <MenuItem value={"ORZO"}>Orzo (Hordeum vulgare)</MenuItem>
                </Select>

                <TextField
                    label="Temperatura"
                    id="controller-temperatura"
                    type='number'
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                        },
                    }}
                />

                <TextField
                    label="Perc. Umidità"
                    id="controller-umidita"
                    type='number'
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        },
                    }}
                />

                <TextField
                    label="Q.tà Acqua"
                    id="controller-acqua"
                    type='number'
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">mm (l/m²)</InputAdornment>,
                        },
                    }}
                />
            </Box>
        </FormControl>
    );
}

export default ControlPanel;