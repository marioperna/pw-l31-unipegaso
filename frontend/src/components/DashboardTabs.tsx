import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { t } from 'i18next';
import * as React from 'react';
import { BusinessData, CustomIndicatorProps, ProductionData } from '../types/common';
import { extractFromLocalStorage, roundTo2Decimal } from '../utilities';
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
    console.log(event);
    setValue(newValue);
    onTabChange(newValue);
  };

  const estimateWaterCosts = (productionData: ProductionData, businessData: BusinessData) => {
    let customIndicators = extractFromLocalStorage('customIndicators') as CustomIndicatorProps;
    let wprice = customIndicators?.customWaterPrice || businessData?.waterPrice || 0;
    let waterConsumed = productionData?.totalCounts?.totalWaterConsumed || 0;
    return roundTo2Decimal(waterConsumed * wprice);
  }


  const estimateEnergyCosts = (productionData: ProductionData, businessData: BusinessData) => {
    let customIndicators = extractFromLocalStorage('customIndicators') as CustomIndicatorProps;
    let eprice = customIndicators?.customEnergyPrice || businessData?.energyPrice || 0;
    let energyConsumed = productionData?.totalCounts?.totalEnergyConsumed || 0;
    return roundTo2Decimal(energyConsumed * eprice);
  }

  const estimateProfit = (productionData: ProductionData, businessData: BusinessData) => {
    let customIndicators = extractFromLocalStorage('customIndicators') as CustomIndicatorProps;
    let pprice = customIndicators?.customProductPrice || businessData?.productPrice || 0;
    let pcost = businessData?.productCost || 0;
    return roundTo2Decimal((productionData.quantity * pprice) - (productionData.quantity * pcost));
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t("CLIMATIC_CONDITIONS")} {...a11yProps(0)} />
          <Tab label={t("PRODUCTIVE_CONDITIONS")} {...a11yProps(1)} />
          <Tab label={t("BUSINESS_CONDITIONS")} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} key={0}>
        <h1 className='text-2xl'>{t("TEMPERATURE")}</h1>
        <CustomLineChart
          data={climaticData}
          lineDataKey='temperature'
          xAxisDataKey='date'
          yAxisDataKey='temperature'
          formatter={(value: number) => `${value} °C`}
        />

        <h1 className='text-2xl'>{t("HUMIDITY")}</h1>
        <CustomLineChart
          data={climaticData}
          lineDataKey='humidity'
          xAxisDataKey='date'
          yAxisDataKey='humidity'
          formatter={(value: number) => `${value} %`}
        />

        <h1 className='text-2xl'>{t("WINDBLOW")}</h1>
        <CustomLineChart
          data={climaticData}
          lineDataKey='windblow'
          xAxisDataKey='date'
          yAxisDataKey='windblow'
          formatter={(value: number) => `${value} km/h`}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} key={1}>

        <div className='flex flex-col md:flex-row md:space-x-4 space-y-4'>
          <div className='flex flex-col space-y-4'>
            <div id="productionQuantityCard" className='bg-customPurple shadow-md rounded-md p-4'>
              <h1 className='font-bold text-2xl'>{t("QUANTITY_PRODUCED")}</h1>
              <p className='text-2xl'>{productionData.quantity} Kg/h</p>
            </div>
            <div id="waterConsumptionCard" className='bg-customGreen shadow-md rounded-md p-4'>
              <h1 className='font-bold text-2xl'>{t("WATER_CONSUMED")}</h1>
              <p className='text-2xl'>{productionData.waterConsumed} Lt/h</p>
            </div>
            <div id="energyConsumptionCard" className='bg-customYellow shadow-md rounded-md p-4'>
              <h1 className='font-bold text-2xl'>{t("ENERGY_CONSUMED")}</h1>
              <p className='text-2xl'>{productionData.energyConsumed} Kw/h</p>
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

        <div className='flex flex-col md:flex-row md:space-x-4 space-y-4'>
          <div className='flex flex-col space-y-4'>
            <div id="totalProductionQtyCard" className='bg-lavender shadow-md rounded-md p-4'>
              <h1 className='font-bold text-2xl'>{t("TOTAL_QUANTITY_PRODUCED")}</h1>
              <p className='text-2xl'>{productionData.totalCounts?.totalHarvested} Kg</p>
            </div>
            <div id="totalWaterConsumptionCard" className='bg-blueGray shadow-md rounded-md p-4'>
              <h1 className='font-bold text-2xl'>{t("WATER_CONSUMED")}</h1>
              <p className='text-2xl'>{productionData.totalCounts?.totalWaterConsumed} Lt</p>
            </div>
            <div id="totalEnergyConsumptionCard" className='bg-realMadridYellow shadow-md rounded-md p-4'>
              <h1 className='font-bold text-2xl'>{t("ENERGY_CONSUMED")}</h1>
              <p className='text-2xl'>{productionData.totalCounts?.totalEnergyConsumed} Kw</p>
            </div>
          </div>

          <div className='w-full'>
            <CustomPosAndNegBarChart 
              valueFormatter={(value: number) => `${value} €`}
              data={[{
                waterCosts: estimateWaterCosts(productionData, businessData),
                energyCosts: estimateEnergyCosts(productionData, businessData),
                profit: estimateProfit(productionData, businessData),
              }]}
              barData={[
                { dataKey: 'waterCosts', fill:'#6699CC' },
                { dataKey: 'energyCosts', fill: '#FEBE10' },
                { dataKey: 'profit', fill: '#1CAC78' }
              ]}
            />
          </div>
        </div>
      </CustomTabPanel>
    </Box>
  );
}

export default DashboardTabs;