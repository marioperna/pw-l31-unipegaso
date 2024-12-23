const { DateTime } = require("luxon");
const HISTORICAL_DATA = require('./historical-data');


function generateRealisticData(min, max) {
    const avg = (min + max) / 2;
    // apply to the avg a random value between -5% and +5%
    const delta = avg * 0.06;
    const randomValue = Math.random() * 2 * delta - delta;
    const result = avg + randomValue;
    return result.toFixed(2);
}



function getStatData(currentCultivation) {
    if(Object.keys(currentCultivation).length === 0) {
        console.log('currentCultivation is empty');
        return;
    }
    const dateTime = DateTime.now();

    let periodStart = currentCultivation.cultivationPeriod.start;
    let periodEnd = currentCultivation.cultivationPeriod.end;

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
        date: dateTime.toFormat('HH:mm:ss'),
        temperature: generateRealisticData(tMin, tMax),
        humidity: generateRealisticData(hMin, hMax),
        precipitation: generateRealisticData(pMin, pMax),
        windblow: generateRealisticData(wMin, wMax),
    }
}


module.exports = {
    getStatData
}
