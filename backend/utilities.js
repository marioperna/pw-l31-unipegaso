const { DateTime } = require("luxon");
const HISTORICAL_DATA = require('./historical-data');


function generateRealisticData(min, max) {
    const avg = (min + max) / 2;
    // apply to the avg a random value between -5% and +5%
    const delta = avg * 0.06;
    const randomValue = Math.random() * 2 * delta - delta;
    const result = avg + randomValue;
    return Math.round(result * 100) / 100;
}



function getStatData(currentCultivation) {
    if(Object.keys(currentCultivation).length === 0) {
        console.log('currentCultivation is empty');
        return;
    }
    const dateTime = DateTime.now();

    let periodStart = currentCultivation.cultivationPeriod.start;
    let periodEnd = currentCultivation.cultivationPeriod.end;
    let productionFixedValues = currentCultivation.productionFixedValues;
    let businiessInfo = currentCultivation.businessInfo;

    let tMin, tMax, hMin, hMax;
    
    // TEMPERATURE
    tMin = HISTORICAL_DATA.temperature[periodStart].min;
    tMax = HISTORICAL_DATA.temperature[periodStart].max;

    // HUMIDITY
    hMin = HISTORICAL_DATA.humidity[periodStart].min;
    hMax = HISTORICAL_DATA.humidity[periodStart].max;

    // PRECIPITATION
    let pMin = HISTORICAL_DATA.precipitation[periodStart].min;
    let pMax = HISTORICAL_DATA.precipitation[periodStart].max;

    // WINDBLOW
    let wMin = HISTORICAL_DATA.windblow[periodStart].min;
    let wMax = HISTORICAL_DATA.windblow[periodStart].max;

    if (periodStart !== periodEnd) {
        tMin = HISTORICAL_DATA.temperature[periodStart].min;
        tMax = HISTORICAL_DATA.temperature[periodEnd].max;

        hMin = HISTORICAL_DATA.humidity[periodStart].min;
        hMax = HISTORICAL_DATA.humidity[periodEnd].max;

        pMin = HISTORICAL_DATA.precipitation[periodStart].min;
        pMax = HISTORICAL_DATA.precipitation[periodEnd].max;

        wMin = HISTORICAL_DATA.windblow[periodStart].min;
        wMax = HISTORICAL_DATA.windblow[periodEnd].max;
    }

    return {
        climatic: {
            date: dateTime.toFormat('HH:mm:ss'),
            temperature: generateRealisticData(tMin, tMax),
            humidity: generateRealisticData(hMin, hMax),
            precipitation: generateRealisticData(pMin, pMax),
            windblow: generateRealisticData(wMin, wMax),
        },
        production: generateProductionData(productionFixedValues),
        businiess: {
            productPrice: businiessInfo.productPrice,
            waterPrice: businiessInfo.waterPrice,
            energyPrice: businiessInfo.energyPrice,
            currentMarketPrice: generateMarketOscillation(businiessInfo.productPrice),
        }
    }
}


function generateMarketOscillation(price) {
    // delta -5% / +8%
    if(!price) {
        console.log('price is empty');
        return 0;
    }
    const delta = price * 0.065;
    const randomValue = Math.random() * 2 * delta - delta;
    const result = price + randomValue;
    return Math.round(result * 100) / 100;
}




function generateProductionData(productionFixedValues) {

    if(Object.keys(productionFixedValues).length === 0) {
        console.log('productionFixedValues is empty');
        return {
            quantity: 0,
            waterConsumed: 0,
            energyConsumed: 0,
        };
    }

    let harvestPeriod = 86.400; // secondi in un giorno
    let dateTime = DateTime.now();
    let year = dateTime.year;
    let isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    let dailyQuantity = productionFixedValues.maxYearlyAmountOfHarvestedKg / (isLeap ? 366 : 365);
    let waterConsumedPerKg = productionFixedValues.waterConsumptionPerKg;
    let energyConsumptionPerKg = productionFixedValues.energyConsumptionPerKg;

    let delta = dailyQuantity * 0.05;
    let randomValue = Math.random() * 2 * delta - delta;
    dailyQuantity += randomValue;

    return {
        quantity: Math.round((dailyQuantity / harvestPeriod) * 100) / 100,
        waterConsumed: Math.round(((waterConsumedPerKg * dailyQuantity) / harvestPeriod) * 100) / 100,
        energyConsumed: Math.round(((energyConsumptionPerKg * dailyQuantity) / harvestPeriod) * 100) / 100,
    }
}


module.exports = {
    getStatData
}
