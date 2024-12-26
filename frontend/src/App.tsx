import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_CULTIVATION_TYPE, MAX_CLIMATIC_SAMPLES } from './app.env';
import { ConnectionState } from './components/ConnectionState';
import { Cultivation } from './types/cultivation';
import { socket } from './socket';
import { BusinessData, ClimaticData, CustomIndicatorProps, ProductionData, ProductionStats } from './types/common';
import { extractFromLocalStorage, removeLocalStorage, roundTo2Decimal, saveToLocalStorage } from './utilities';
import ControlPanel from './components/ControlPanel';
import CultivationStats from './components/CultivationStats';
import DashboardTabs from './components/DashboardTabs';


function App() {
  const { t } = useTranslation();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [currentCultivation, setCurrentCultivation] = useState({} as Cultivation);
  const [currentTab, setCurrentTab] = useState(0);
  const [climaticData, setClimaticData] = useState([] as ClimaticData[]);
  const [productionData, setProductionData] = useState({} as ProductionData);
  const [businessData, setBusinessData] = useState({} as BusinessData);

  // provide some infos about the selected cultivation
  const getCultivationIndicators = (cultivationCode: string) => {
    if (!cultivationCode) {
      console.error('CULTIVATION_CODE_IS_REQUIRED');
      return;
    }

    fetch(`/api/indicatori-coltivazioni/${cultivationCode.toUpperCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('NETWORK_RESPONSE_ERROR');
        }
        return response.json();
      })
      .then((data: Cultivation) => {
        setCurrentCultivation(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  const manageCultivationChange = (cultivationCode: string) => {
    setClimaticData([]);
    setProductionData({} as ProductionData);
    setBusinessData({} as BusinessData);
    removeLocalStorage('customIndicators'); // remove all exsisting filters from local storage

    getCultivationIndicators(cultivationCode);
  }

  const dropWebsocketConnection = () => {
    console.log('Dropping websocket connection');
    socket.disconnect();
  }

  const init = () => {
    removeLocalStorage('customIndicators'); // remove all exsisting filters from local storage
    getCultivationIndicators(DEFAULT_CULTIVATION_TYPE);
  }

  const resetDashboard = () => {
    setCurrentTab(0);
    setClimaticData([]);
    setProductionData({} as ProductionData);
    setBusinessData({} as BusinessData);
    init();
  }

  const manageCustomIndicators = (customIndicators: CustomIndicatorProps) => {
    let existingCustomIndicators = extractFromLocalStorage('customIndicators') as CustomIndicatorProps;

    if (!existingCustomIndicators) { return; }

    // replacing null values with 0
    Object.keys(customIndicators).forEach((key) => {
      if (!customIndicators[key as keyof CustomIndicatorProps]) {
        customIndicators[key as keyof CustomIndicatorProps] = 0;
      }
    })

    saveToLocalStorage('customIndicators', { ...existingCustomIndicators, ...customIndicators });
  }

  useEffect(() => {
    if (currentCultivation && Object.keys(currentCultivation).length > 0) {
      socket.emit('LOOKING_CULTIVATION', JSON.stringify(currentCultivation));
    }
  }, [currentCultivation]);

  useEffect(() => {
    init();

    /** 
     * START MANAGING WEBSOCKET EVENTS
     */
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onProductionDataEvent(data: ProductionData) {
      setProductionData(previous => {
        let totalCounts = {
          totalHarvested: data.quantity,
          totalWaterConsumed: data.waterConsumed,
          totalEnergyConsumed: data.energyConsumed
        } as ProductionStats;

        if (previous && previous.totalCounts) {
          totalCounts.totalHarvested = previous.totalCounts.totalHarvested + data.quantity;
          totalCounts.totalWaterConsumed = previous.totalCounts.totalWaterConsumed + data.waterConsumed;
          totalCounts.totalEnergyConsumed = previous.totalCounts.totalEnergyConsumed + data.energyConsumed;
        }

        totalCounts.totalHarvested = roundTo2Decimal(totalCounts.totalHarvested);
        totalCounts.totalWaterConsumed = roundTo2Decimal(totalCounts.totalWaterConsumed);
        totalCounts.totalEnergyConsumed = roundTo2Decimal(totalCounts.totalEnergyConsumed);

        return { ...data, totalCounts };
      });
    }

    function onBusinessDataEvent(data: BusinessData) {
      setBusinessData(data);
    }

    function onClimaticDataEvent(data: ClimaticData) {
      let customIndicators = extractFromLocalStorage('customIndicators') as CustomIndicatorProps;

      setClimaticData(previous => {
        if (previous.length >= MAX_CLIMATIC_SAMPLES) {
          previous.shift();
        }

        if (customIndicators) {
          if (customIndicators.customTemperature) {
            data.temperature = roundTo2Decimal(data.temperature * (1 + customIndicators.customTemperature / 100));
          }

          if (customIndicators.customHumidity) {
            data.humidity = roundTo2Decimal(data.humidity * (1 + customIndicators.customHumidity / 100));
          }

          if (customIndicators.customWindblow) {
            data.windblow = roundTo2Decimal(data.windblow * (1 + customIndicators.customWindblow / 100));
          }
        }

        return [...previous, data];
      });
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('getClimaticData', onClimaticDataEvent);
    socket.on('getProductionData', onProductionDataEvent);
    socket.on('getBusinessData', onBusinessDataEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('getClimaticData', onClimaticDataEvent);
      socket.off('getProductionData', onProductionDataEvent);
      socket.off('getBusinessData', onBusinessDataEvent);
    };

    /** END MANAGING WEBSOCKET EVENTS */
  }, []);

  return (
    <>
      <div id="root-pw">
        <div id="root_pw_title" className='bg-white w-full h-30 p-4 text-center'>
          <h1 className='text-2xl font-bold'>{t("PAGE_TITLE")}</h1>
        </div>

        <div id="container" className='h-screen flex flex-col md:flex-wrap'>
          <div id="control_panel" className='flex flex-col h-full w-full md:w-1/4 bg-gray-200'>
            <div id="control_panel_title" className='bg-gray-800 text-white w-full h-30 p-4'>
              <h1 className='font-bold'>{t("CONTROL_PANEL_TITLE")}</h1>
              <ConnectionState className='text-white text-xs' title='WebSocket Status' isConnected={isConnected} />
            </div>

            <div className='p-4'>
              <ControlPanel
                showControlForTab={currentTab}
                onCultivationSelectorChange={manageCultivationChange}
                onFormValuesChange={(ci) => { manageCustomIndicators(ci) }}
                onDisconnect={() => dropWebsocketConnection()}
                onReset={() => { resetDashboard() }}
              />
            </div>
          </div>

          <div id="dashboard" className='flex flex-col w-full md:w-3/4 bg-gray-100'>
            <div className='flex flex-col'>
              <div id="control_panel_title" className='bg-gray-800 text-white w-full h-30 p-6'>
                <h1 className='font-bold'>{t("CULTIVATION_ANALIYSIS_AND_TREND")}</h1>
              </div>

              <div id="contents" className='flex flex-col justify-between h-full p-4'>
                <div id="cultivation_stats">
                  <CultivationStats currentCultivation={currentCultivation} comparingData={climaticData} />
                </div>

                <div id="dashboard_tabs" className='bg-white p-4 mt-4 rounded-md shadow-md'>
                  <DashboardTabs
                    productionData={productionData}
                    businessData={businessData}
                    climaticData={climaticData}
                    onTabChange={(ct: number) => setCurrentTab(ct)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
