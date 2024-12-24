import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import { ConnectionState } from './components/ConnectionState';
import ControlPanel from './components/ControlPanel';
import CultivationStats from './components/CultivationStats';
import DashboardTabs from './components/DashboardTabs';
import { socket } from './socket';
import { ClimaticData, CustomIndicatorProps } from './types/common';
import { Cultivation } from './types/cultivation';
import { extractFromLocalStorage, removeLocalStorage, saveToLocalStorage } from './utilities';
import { MAX_SAMPLES } from './app.env';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [currentCultivation, setCurrentCultivation] = useState({} as Cultivation);
  const [currentTab, setCurrentTab] = useState(0);
  const [climaticData, setClimaticData] = useState([] as ClimaticData[]);

  const { t } = useTranslation();

  // Give info about the cultivation. 
  const getCultivationIndicators = (cultivationCode: string) => {
    if (!cultivationCode) {
      console.error('CULTIVATION_CODE_IS_REQUIRED');
      return;
    }

    fetch(`/api/indicatori-coltivazioni/${cultivationCode.toUpperCase()}`)
      .then((response) => {
        // Verifica se la risposta è OK (status 200-299)
        if (!response.ok) {
          throw new Error('NETWORK_RESPONSE_ERROR');
        }
        return response.json();  // Converte la risposta in JSON
      })
      .then((data: Cultivation) => {
        setCurrentCultivation(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }


  const resetGraphData = () => {
    console.log("Resetting graph data");
    setClimaticData([]);
  }

  const manageCultivationChange = (cultivationCode: string) => {
    resetGraphData();
    getCultivationIndicators(cultivationCode);
  }

  useEffect(() => {
    if (Object.keys(currentCultivation).length > 0) {
      socket.emit('LOOKING_CULTIVATION', JSON.stringify(currentCultivation));
    }
  }, [currentCultivation]);


  const dropWebsocketConnection = () => {
    console.log('Dropping websocket connection');
    socket.disconnect();
  }

  const manageCustomIndicators = (customIndicators: CustomIndicatorProps) => {
    let existingCustomIndicators = extractFromLocalStorage('customIndicators') as CustomIndicatorProps;

    // replacing null values with 0
    Object.keys(customIndicators).forEach((key) => {
      if(!customIndicators[key as keyof CustomIndicatorProps]) {
        customIndicators[key as keyof CustomIndicatorProps] = 0;
      }
    })

    saveToLocalStorage('customIndicators', { ...existingCustomIndicators, ...customIndicators });
  }

  const init = () => {
    // remove all exsisting filters from local storage
    removeLocalStorage('customIndicators');
  }

  useEffect(() => {
    init()
    getCultivationIndicators('MAIZE'); // start with MAIZ preselected

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onClimaticDataEvent(data: ClimaticData) {
      setClimaticData(previous => {
        if (previous.length >= MAX_SAMPLES) {
          previous.shift();
        }

        let customIndicators = extractFromLocalStorage('customIndicators') as CustomIndicatorProps;
        if(customIndicators !== null) {
          if (customIndicators.customTemperature) {
            console.log("Applying temperature change");
            data.temperature = Math.round(data.temperature * (1 + customIndicators.customTemperature / 100) * 100) / 100;
          }
  
          if (customIndicators.customHumidity) {
            console.log("Applying humidity change");
            data.humidity = Math.round(data.humidity * (1 + customIndicators.customHumidity / 100) * 100) / 100;
          }

          if (customIndicators.customWindblow) {
            console.log("Applying windblow change");
            data.windblow = Math.round(data.windblow * (1 + customIndicators.customWindblow / 100) * 100) / 100;
          }
        }

        return [...previous, data];
      });
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('getClimaticData', onClimaticDataEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('getClimaticData', onClimaticDataEvent);
    };
  }, []);

  return (
    <>
      <div id="root">
        <div id="root_title" className='bg-white w-full h-30 p-4 text-center'>
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
              />
            </div>
          </div>

          <div id="dashboard" className='flex flex-col h-full w-full md:w-3/4 bg-gray-100'>
            <div className='flex flex-col'>
              <div id="control_panel_title" className='bg-gray-800 text-white w-full h-30 p-6'>
                <h1 className='font-bold'>{t("CULTIVATION_ANALIYSIS_AND_TREND")}</h1>
              </div>

              <div id="contents" className='flex flex-col justify-between h-full p-4'>
                {/* contents here */}
                <div id="cultivation_stats">
                  <CultivationStats currentCultivation={currentCultivation} comparingData={climaticData} />
                </div>

                <div id="dashboard_tabs" className='bg-white p-4 mt-4 rounded-md shadow-md'>
                  <DashboardTabs climaticData={climaticData} onTabChange={(ct: number) => setCurrentTab(ct)} />
                </div>
                {/* end contents */}
              </div>
            </div>
          </div>
        </div>

      </div>
      {/*  */}
    </>
  )
}

export default App
