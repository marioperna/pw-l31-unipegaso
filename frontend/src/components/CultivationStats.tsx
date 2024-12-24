import { useTranslation } from "react-i18next";
import { Cultivation } from "../types/cultivation";
import { DateTime } from "luxon";

function CultivationStats({ currentCultivation }: { currentCultivation: Cultivation }) {
  const { t } = useTranslation();

  return (
    <div id="stats" className='flex flex-col md:flex-row gap-4'>
      {/* Temperature */}
      <div id="temperature_card" className='w-full shadow-md rounded-md font-bold p-4 bg-white'>
        <h2 className='text-xl'>{t("TEMPERATURE")}</h2>
        <p>{currentCultivation?.optimalTemperature?.min} - {currentCultivation?.optimalTemperature?.max} {currentCultivation?.optimalTemperature?.unitMeasure}</p>
      </div>

      {/* Period */}
      <div id="period_card" className='w-full shadow-md rounded-md font-bold p-4 bg-white'>
        <h2 className='text-xl'>{t("PERIOD")}</h2>
        <p>{DateTime.fromObject({ month: currentCultivation?.cultivationPeriod?.start }).monthLong} - {DateTime.fromObject({ month: currentCultivation?.cultivationPeriod?.end }).monthLong}</p>
        <p className='text-sm'>({currentCultivation?.duration?.min} - {currentCultivation?.duration?.max} {currentCultivation?.duration?.unitMeasure})</p>
      </div>

      {/* Soil Humidity */}
      <div id="humidity_card" className='w-full shadow-md rounded-md font-bold p-4 bg-white'>
        <h2 className='text-xl'>{t("HUMIDITY")}</h2>
        <p>{currentCultivation?.soilHumidity?.min} - {currentCultivation?.soilHumidity?.max} {currentCultivation?.soilHumidity?.unitMeasure}</p>
      </div>

      {/* Water Quantity */}
      <div id="water_card" className='w-full shadow-md rounded-md font-bold p-4 bg-white'>
        <h2 className='text-xl'>{t("PRECIPITATION")}</h2>
        <p>{currentCultivation?.waterQuantity?.min} - {currentCultivation?.waterQuantity?.max} {currentCultivation?.waterQuantity?.unitMeasure}</p>
      </div>
    </div>
  );
}

export default CultivationStats;
