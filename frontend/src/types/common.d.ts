export interface ClimaticData {
    date: string;
    temperature: number;
    humidity: number;
    precipitation: number;
    windblow: number;
}


export interface ProductionData {
    quantity: number;
    waterConsumed: number;
    energyConsumed: number;
    totalCounts: ProductionStats;
}
export interface CustomIndicatorProps {
    customTemperature?: number;
    customHumidity?: number;
    customWindblow?: number;
    customProductPrice?: number;
    customWaterPrice?: number;
    customEnergyPrice?: number;
}

export interface ManipulatedBusinessData extends BusinessData {
    totalCosts: number;
    earned: number;
    bep: number;
}

export interface BusinessData {
    productCost: number;
    productPrice: number;
    waterPrice: number;
    energyPrice: number;
    currentMarketPrice: number;
}


export interface ProductionStats {
    totalHarvested: number;
    totalWaterConsumed: number;
    totalEnergyConsumed: number;
}
