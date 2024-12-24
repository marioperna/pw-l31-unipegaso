import { useTranslation } from "react-i18next";
import { Cultivation } from "../types/cultivation";
import { DateTime } from "luxon";
import { ClimaticData } from "../types/common";

function CultivationStats({ currentCultivation, comparingData }: { currentCultivation: Cultivation, comparingData: ClimaticData[] }) {
  const { t } = useTranslation();
  const lastComparingData = comparingData[comparingData.length - 1] || {} as ClimaticData;

  const applyCSSClass = (cardKey: string, lastComparingData: ClimaticData) => {
    if(!Object.keys(lastComparingData).length) {
      return 'bg-white';
    }
  
    switch (cardKey) {
      case 'temperature':
        return applyTemperatureCSSClass(lastComparingData);
      case 'humidity':
        return applyHumidityCSSClass(lastComparingData);
      case 'period':
        return applyPeriodCSSClass();
      default:
        return 'bg-white';
    } 
  }

  const applyTemperatureCSSClass = (lastComparingData: ClimaticData) => {
    if (lastComparingData.temperature < currentCultivation.optimalTemperature.min || lastComparingData.temperature > currentCultivation.optimalTemperature.max) {
      return 'bg-red-200';
    } 
      return 'bg-green-200';
  }

  const applyHumidityCSSClass = (lastComparingData: ClimaticData) => {
    if (lastComparingData.humidity < currentCultivation.soilHumidity.min || lastComparingData.humidity > currentCultivation.soilHumidity.max) {
      return 'bg-red-200';
    }
    return 'bg-green-200';
  }


  const applyPeriodCSSClass = () => {
    const currentMonth = DateTime.local().month;
    if (currentMonth < currentCultivation.cultivationPeriod.start || currentMonth > currentCultivation.cultivationPeriod.end) {
      return 'bg-red-200';
    }
    return 'bg-green-200';
  }


  return (
    <div id="stats" className='flex flex-col md:flex-row gap-4'>
      {/* Temperature */}
      <div id="temperature_card" className={'w-full shadow-md rounded-md font-bold p-4 ' + applyCSSClass('temperature', lastComparingData)}>
        <h2 className='text-xl'>{t("TEMPERATURE")}</h2>
        <p>{currentCultivation?.optimalTemperature?.min} - {currentCultivation?.optimalTemperature?.max} {currentCultivation?.optimalTemperature?.unitMeasure}</p>
      </div>

      {/* Period */}
      <div id="period_card" className={'w-full shadow-md rounded-md font-bold p-4 ' + applyCSSClass('period', lastComparingData)}>
        <h2 className='text-xl'>{t("PERIOD")}</h2>
        <p>{DateTime.fromObject({ month: currentCultivation?.cultivationPeriod?.start }).monthLong} - {DateTime.fromObject({ month: currentCultivation?.cultivationPeriod?.end }).monthLong}</p>
        <p className='text-sm'>({currentCultivation?.duration?.min} - {currentCultivation?.duration?.max} {currentCultivation?.duration?.unitMeasure})</p>
      </div>

      {/* Soil Humidity */}
      <div id="humidity_card" className={'w-full shadow-md rounded-md font-bold p-4 ' + applyCSSClass('humidity', lastComparingData)}>
        <h2 className='text-xl'>{t("HUMIDITY")}</h2>
        <p>{currentCultivation?.soilHumidity?.min} - {currentCultivation?.soilHumidity?.max} {currentCultivation?.soilHumidity?.unitMeasure}</p>
      </div>

      {/* Water Quantity */}
      <div id="water_card" className={'w-full shadow-md rounded-md font-bold p-4 '+ applyCSSClass('precipitation', lastComparingData)}>
        <h2 className='text-xl'>{t("PRECIPITATION")}</h2>
        <p>{currentCultivation?.waterQuantity?.min} - {currentCultivation?.waterQuantity?.max} {currentCultivation?.waterQuantity?.unitMeasure}</p>
      </div>
    </div>
  );
}

export default CultivationStats;
