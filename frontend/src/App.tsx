import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import { ConnectionState } from './components/ConnectionState';
import ControlPanel from './components/ControlPanel';
import CultivationStats from './components/CultivationStats';
import DashboardTabs from './components/DashboardTabs';
import { socket } from './socket';
import { Cultivation } from './types/cultivation';

const MAX_SAMPLES = 10;

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [currentCultivation, setCurrentCultivation] = useState({} as Cultivation);
  const [currentTab, setCurrentTab] = useState(0);
  const [statsData, setStatsData] = useState([] as any[]);
  const { t } = useTranslation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const manageControlPanelFormValues = (formValues: any) => { }

  const getCultivationIndicators = (cultivationCode: string) => {
    if(!cultivationCode) {
      console.error('CULTIVATION_CODE_IS_REQUIRED');
      return;
    }

    fetch(`/api/indicatori-coltivazioni/${cultivationCode.toUpperCase()}`) // Replace with your API endpoint
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

  useEffect(() => {
    // send a test message to the server
    console.log('currentCultivation', currentCultivation);
    if(Object.keys(currentCultivation).length > 0){
      socket.emit('LOOKING_CULTIVATION', JSON.stringify(currentCultivation));
    }
  }, [currentCultivation]);


  useEffect(() => {
    getCultivationIndicators('MAIZE');

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onStatsData(data: any) {
      setStatsData(previous => {
        if (previous.length >= MAX_SAMPLES) {
          previous.shift();
        }
        return [...previous, data];
      });
    }

    socket.on('STATS_DATA', onStatsData);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('STATS_DATA', onStatsData);
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
                onCultivationSelectorChange={getCultivationIndicators} 
                onFormValuesChange={(formValues) => manageControlPanelFormValues(formValues)}
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
                  <CultivationStats currentCultivation={currentCultivation} />
                </div>
                
                <div id="dashboard_tabs" className='bg-white p-4 mt-4 rounded-md shadow-md'>
                  <DashboardTabs statsData={statsData}  onTabChange={(ct: number) => setCurrentTab(ct) } />
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
