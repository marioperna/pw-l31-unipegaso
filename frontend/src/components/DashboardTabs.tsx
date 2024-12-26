import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { t } from 'i18next';
import * as React from 'react';
import { BusinessData, CustomIndicatorProps, ProductionData } from '../types/common';
import { extractFromLocalStorage } from '../utilities';
import CustomBarChart from './CustomBarChart';
import CustomLineChart from './CustomLineChart';
import CustomPosAndNegBarChart from './CustomPosAndNegBarChart';
import { TabPanelProps } from '../interfaces/tabpanel.interface';


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function DashboardTabs({ onTabChange, climaticData, productionData, businessData }: { onTabChange: any, climaticData: any, productionData: ProductionData , businessData: BusinessData }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  const estimateWaterCosts = (productionData: ProductionData, businessData: BusinessData) => {
    let customIndicators = extractFromLocalStorage('customIndicators') as CustomIndicatorProps;
    let wprice = customIndicators?.customWaterPrice || businessData?.waterPrice || 0;
    return productionData.waterConsumed * wprice;
  }


  const estimateEnergyCosts = (productionData: ProductionData, businessData: BusinessData) => {
    let customIndicators = extractFromLocalStorage('customIndicators') as CustomIndicatorProps;
    let eprice = customIndicators?.customEnergyPrice || businessData?.energyPrice || 0;
    return productionData.energyConsumed * eprice;
  }

  const estimateProfit = (productionData: ProductionData, businessData: BusinessData) => {
    let customIndicators = extractFromLocalStorage('customIndicators') as CustomIndicatorProps;
    let pprice = customIndicators?.customProductPrice || businessData?.productPrice || 0;
    let pcost = businessData?.productCost || 0;
    return (productionData.quantity * pprice) - (productionData.quantity * pcost);
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Condizioni Climatiche" {...a11yProps(0)} />
          <Tab label="Condizioni Produttive" {...a11yProps(1)} />
          <Tab label="Condizioni Economiche" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} key={0}>
        <h1 className='text-2xl'>Temperatura</h1>
        <CustomLineChart
          data={climaticData}
          lineDataKey='temperature'
          xAxisDataKey='date'
          yAxisDataKey='temperature'
        />

        <h1 className='text-2xl'>Umidità</h1>
        <CustomLineChart
          data={climaticData}
          lineDataKey='humidity'
          xAxisDataKey='date'
          yAxisDataKey='humidity'
        />

        <h1 className='text-2xl'>Vento</h1>
        <CustomLineChart
          data={climaticData}
          lineDataKey='windblow'
          xAxisDataKey='date'
          yAxisDataKey='windblow'
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} key={1}>

        <div className='flex flex-col md:flex-row md:space-x-4 space-y-4'>
          <div className='flex flex-col space-y-4'>
            <div id="productionQuantityCard" className='bg-customPurple shadow-md rounded-md p-4'>
              <h1 className='font-bold text-2xl'>{t("QUANTITY_PRODUCED")}</h1>
              <p className='text-2xl'>{productionData.quantity} Kg/s</p>
            </div>
            <div id="waterConsumptionCard" className='bg-customGreen shadow-md rounded-md p-4'>
              <h1 className='font-bold text-2xl'>{t("WATER_CONSUMED")}</h1>
              <p className='text-2xl'>{productionData.waterConsumed} Lt/s</p>
            </div>
            <div id="energyConsumptionCard" className='bg-customYellow shadow-md rounded-md p-4'>
              <h1 className='font-bold text-2xl'>{t("ENERGY_CONSUMED")}</h1>
              <p className='text-2xl'>{productionData.energyConsumed} Kw/s</p>
            </div>
          </div>

          <div className='w-full'>
            <CustomBarChart
              barData={[
                { dataKey: 'quantity', fill: '#8884d8' },
                { dataKey: 'waterConsumed', fill: '#82ca9d' },
                { dataKey: 'energyConsumed', fill: '#ffc658' }
              ]}
              data={[productionData]}
            />
          </div>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2} key={2}>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <div id="productionQuantityCard" className='bg-customPurple shadow-md rounded-md p-4'>
            <h1 className='font-bold text-2xl'>Totale prodotto</h1>
            <p className='text-2xl'>{productionData.totalCounts?.totalHarvested} Kg</p>
          </div>
          <div id="waterConsumptionCard" className='bg-customGreen shadow-md rounded-md p-4'>
            <h1 className='font-bold text-2xl'>Acqua consumata</h1>
            <p className='text-2xl'>{productionData.totalCounts?.totalWaterConsumed} Lt</p>
          </div>
          <div id="energyConsumptionCard" className='bg-customYellow shadow-md rounded-md p-4'>
            <h1 className='font-bold text-2xl'>Energia consumata</h1>
            <p className='text-2xl'>{productionData.totalCounts?.totalEnergyConsumed} Kw</p>
          </div>
        </div>
          
        <CustomPosAndNegBarChart 
          data={[{
            waterCosts: estimateWaterCosts(productionData, businessData),
            energyCosts: estimateEnergyCosts(productionData, businessData),
            profit: estimateProfit(productionData, businessData),
          }]}
          barData={[
            { dataKey: 'waterCosts', fill: '#8884d8' },
            { dataKey: 'energyCosts', fill: '#82ca9d' },
            { dataKey: 'profit', fill: '#ffc658' }
          ]}
        />
      </CustomTabPanel>
    </Box>
  );
}

export default DashboardTabs;