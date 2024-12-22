import { useEffect, useState } from 'react';
import './App.css';
import { ConnectionState } from './components/ConnectionState';
import ControlPanel from './components/ControlPanel';
import CultivationStats from './components/CultivationStats';
import DashboardTabs from './components/DashboardModePicker';
import { socket } from './socket';
import { Cultivation } from './types/cultivation';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [currentCultivation, setCurrentCultivation] = useState({} as Cultivation);


  const getIndicatoreColtivazione = (codiceColtivazione: string) => {
    if(!codiceColtivazione) {
      console.error('CULTIVATION_CODE_IS_REQUIRED');
      return;
    }

    fetch(`/api/indicatori-coltivazioni/${codiceColtivazione.toUpperCase()}`) // Replace with your API endpoint
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
    getIndicatoreColtivazione('MAIS');

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // Uncomment the following function and socket event listener if you need to handle 'foo' events
    // function onFooEvent(value: any) {
    //   setFooEvents(previous => [...previous, value]);
    // }

    socket.on('GET_DASHBOARD_TEMPERATURE', (data) => {
      console.log('temperature', data)
    });

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    // socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      // socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <>
      <div id="root">
        <div id="root_title" className='bg-white w-full h-30 p-4 text-center'>
          <h1 className='text-2xl font-bold'>Dashboard azienda agricola Pegaso (WIP)</h1>
        </div>
        
        <div id="container" className='h-screen flex flex-col md:flex-wrap'>
          <div id="control_panel" className='flex flex-col h-full w-full md:w-1/4 bg-gray-200'>
            <div id="control_panel_title" className='bg-gray-800 text-white w-full h-30 p-4'>
              <h1 className='font-bold'>Pannello di controllo</h1>
              <ConnectionState className='text-white text-xs' title='WebSocket Status' isConnected={isConnected} />
            </div>

            <div className='p-4'>
              <ControlPanel onCultivationSelectorChange={getIndicatoreColtivazione} />
            </div>
          </div>

          <div id="dashboard" className='flex flex-col h-full w-full md:w-3/4 bg-gray-100'>
            <div className='flex flex-col'>
              <div id="control_panel_title" className='bg-gray-800 text-white w-full h-30 p-6'>
                <h1 className='font-bold'>Andamento e Previsioni</h1>
              </div>
              
              
              <div id="contents" className='flex flex-col mt-4  p-4'>
                {/* contents here */}
                <CultivationStats currentCultivation={currentCultivation} />
                <DashboardTabs />
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
