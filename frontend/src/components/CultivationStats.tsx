import { Cultivation } from "../types/cultivation";

function CultivationStats({ currentCultivation }: { currentCultivation: Cultivation }) {
  return (
    <div id="stats" className='flex flex-col md:flex-row gap-4'>
      {/* temperatura */}
      <div id="temperature_card" className='w-full shadow-md rounded-md font-bold p-4 bg-white'>
        <h2 className='text-xl'>Temperatura</h2>
        <p>{currentCultivation?.temperaturaOttimale?.min} - {currentCultivation?.temperaturaOttimale?.max} {currentCultivation?.temperaturaOttimale?.unitaMisura}</p>
      </div>

      {/* durata */}
      <div id="period_card" className='w-full shadow-md rounded-md font-bold p-4 bg-white'>
        <h2 className='text-xl'>Periodo</h2>
        <p>{currentCultivation?.periodoColtivazione?.inizio} - {currentCultivation?.periodoColtivazione?.fine}</p>
        <p className='text-sm'>({currentCultivation?.durata?.min} - {currentCultivation?.durata?.max} {currentCultivation?.durata?.unitaMisura})</p>
      </div>

      {/* Umidità suolo */}
      <div id="humidity_card" className='w-full shadow-md rounded-md font-bold p-4 bg-white'>
        <h2 className='text-xl'>Umidità Suolo</h2>
        <p>{currentCultivation?.umiditaSuolo?.min} - {currentCultivation?.umiditaSuolo?.max} {currentCultivation?.umiditaSuolo?.unitaMisura}</p>
      </div>

      {/* Quantità di acqua */}
      <div id="water_card" className='w-full shadow-md rounded-md font-bold p-4 bg-white'>
        <h2 className='text-xl'>Quantità Acqua</h2>
        <p>{currentCultivation?.quantitaAcqua?.min} - {currentCultivation?.quantitaAcqua?.max} {currentCultivation?.quantitaAcqua?.unitaMisura}</p>
      </div>
    </div>

  );
}

export default CultivationStats;