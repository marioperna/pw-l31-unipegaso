import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomLineChart from './CustomLineChart';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

function DashboardTabs({ onTabChange, statsData }: { onTabChange: any, statsData: any }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onTabChange(newValue);
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Condizioni Climatiche" {...a11yProps(0)} />
          <Tab label="Condizioni Produttive" {...a11yProps(1)} />
          <Tab label="Condizioni Economiche" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <h1 className='text-2xl'>Temperatura</h1>
        <CustomLineChart
          data={statsData}
          lineDataKey='temperature'
          xAxisDataKey='date'
          yAxisDataKey='temperature'
        />

        <h1 className='text-2xl'>Umidità</h1>

        <CustomLineChart
          data={statsData}
          lineDataKey='humidity'
          xAxisDataKey='date'
          yAxisDataKey='humidity'
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      </CustomTabPanel>
    </Box>
  );
}

export default DashboardTabs;