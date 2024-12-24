export interface ClimaticData {
    date: string;
    temperature: number;
    humidity: number;
    precipitation: number;
    windblow: number;
}


export interface CustomIndicatorProps {
    customTemperature?: number;
    customHumidity?: number;
    customWindblow?: number;
}


