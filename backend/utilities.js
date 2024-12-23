const { DateTime } = require("luxon");
const HISTORICAL_DATA = require('./historical-data');


function generateRealisticData(min, max, numPoints) {
    const data = [];
    const range = max - min;

    for (let i = 0; i < numPoints; i++) {
        // Genera un valore casuale all'interno dell'intervallo, con un po' di variabilità
        const value = min + Math.random() * range;

        // Applica una piccola oscillazione per simulare fluttuazioni giornaliere
        const oscillation = Math.sin(i / numPoints * Math.PI * 2) * range * 0.1;
        const realisticValue = Math.max(min, Math.min(max, value + oscillation));

        data.push(Number(realisticValue.toFixed(2))); // Mantieni solo due decimali
    }

    return data;
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
        date: dateTime.toFormat('yyyy-MM-dd\'T\'HH:mm:ss'),
        temperature: generateRealisticData(tMin, tMax, 1),
        humidity: generateRealisticData(hMin, hMax, 1),
        precipitation: generateRealisticData(pMin, pMax, 1),
        windblow: generateRealisticData(wMin, wMax, 1),
    }
}


module.exports = {
    getStatData
}
