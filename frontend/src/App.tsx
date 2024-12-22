import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';


export type Cultivation = {
    nome: string;
    descrizione: string;
    periodoColtivazione: {
        inizio: string;
        fine: string;
    },
    periodoRaccolto: {
        inizio:string;
        fine: string;
    },
    temperaturaOttimale: {
        min: number;
        max: number;
        unitaMisura: string;
    }
    durata: {
        min: number;
        max: number;
        unitaMisura: string;
    };
    quantitaAcqua: {
      min: number;
      max: number;
      unitaMisura: string;
    },
    umiditaSuolo: {
      min: number;
      max: number;
      unitaMisura: string;
    },
    percentualeSole: {
      min: number;
      max: number;
      unitaMisura: string;
    }
  } 

function App() {
  const [count, setCount] = useState(0)
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [currentCultivation, setCurrentCultivation] = useState({} as Cultivation);


  const getIndicatoreColtivazione = (codiceColtivazione: string) => {
    if(!codiceColtivazione) {
      console.error('Codice coltivazione non selezionato');
      return;
    }

    fetch(`/api/indicatori-coltivazioni/${codiceColtivazione.toUpperCase()}`) // Replace with your API endpoint
    .then((response) => {
      // Verifica se la risposta è OK (status 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
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
          <h1 className='text-2xl font-bold'>Cruscotto dati::azienda agricola H-Farm</h1>
        </div>
        
        <div id="container" className='h-screen flex flex-col md:flex-wrap'>
          <div id="control_panel" className='flex flex-col h-full w-full md:w-1/4 bg-gray-200'>
            <div className='flex flex-col'>
             
              <div id="control_panel_title" className='bg-gray-800 text-white w-full h-30 p-4'>
                <h1 className='font-bold'>Pannello di controllo</h1>
                <ConnectionState className='text-white text-xs' title='WebSocket Status' isConnected={ isConnected } />
              </div>

              <div className='p-4'>
                <FormControl fullWidth>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <InputLabel id="label-raccolto">Raccolto</InputLabel>
                    <Select
                      labelId="label-raccolto"
                      id="dropdown-raccolto"
                      label="Raccolto"
                      defaultValue={"MAIS"}
                      onChange={(e) => getIndicatoreColtivazione(e.target.value)}
                    >
                      <MenuItem value={"MAIS"}>Mais (Zea mays)</MenuItem>
                      <MenuItem value={"SEGALE"}>Segale (Secale cereale)</MenuItem>
                      <MenuItem value={"GRANO_TENERO"}>Grano tenero (Triticum aestivum)</MenuItem>
                      <MenuItem value={"ORZO"}>Orzo (Hordeum vulgare)</MenuItem>
                    </Select>

                    <TextField
                      label="Temperatura"
                      id="controller-temperatura"
                      type='number'
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                        },
                      }}
                    />

                    <TextField
                      label="Perc. Umidità"
                      id="controller-umidita"
                      type='number'
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        },
                      }}
                    />

                    <TextField
                      label="Q.tà Acqua"
                      id="controller-acqua"
                      type='number'
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="end">mm (l/m²)</InputAdornment>,
                        },
                      }}
                    />
                  </Box>
                </FormControl>

                <div id="form_content" className='flex flex-col mt-4 p-4'>
                  {/* here form for pilot dashboard */}
                </div>
              </div>
              
            </div>
          </div>

          <div id="dashboard" className='flex flex-col h-full w-full md:w-3/4 bg-gray-100'>
            <div className='flex flex-col'>
              <div id="control_panel_title" className='bg-gray-800 text-white w-full h-30 p-6'>
                <h1 className='font-bold'>Andamento e Previsioni</h1>
              </div>
              
              
              <div id="contents" className='flex flex-col mt-4  p-4'>
                {/* contents here */}
                
                <div id="daily_stats" className='flex flex-col md:flex-row gap-4'>
                  {/* temperatura */}
                  <div id="temperature_card" className='w-full shadow-md rounded-md font-bold p-4 bg-white'>
                    <h2 className='text-xl'>Temperatura</h2>
                    <p>{currentCultivation?.temperaturaOttimale?.min} - {currentCultivation?.temperaturaOttimale?.max} {currentCultivation?.temperaturaOttimale?.unitaMisura}</p>
                  </div>

                  {/* durata */}
                  <div id="period_card" className='w-full shadow-md rounded-md font-bold p-4 bg-white'>
                    <h2 className='text-xl'>Periodo</h2>
                    <p>{currentCultivation?.periodoColtivazione.inizio} - {currentCultivation?.periodoColtivazione.fine}</p>
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
