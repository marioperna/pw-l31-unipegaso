export type Cultivation = {
    name: string;
    description: string;
    cultivationPeriod: {
        start: number;
        end: number;
    },
    harvestPeriod: {
        start: number;
        end: number;
    },
    optimalTemperature: {
        min: number;
        max: number;
        unitMeasure: string;
    }
    duration: {
        min: number;
        max: number;
        unitMeasure: string;
    };
    waterQuantity: {
        min: number;
        max: number;
        unitMeasure: string;
    },
    soilHumidity: {
        min: number;
        max: number;
        unitMeasure: string;
    },
    sunlightPercentage: {
        min: number;
        max: number;
        unitMeasure: string;
    }
}