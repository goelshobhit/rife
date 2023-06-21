import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@material-ui/core/styles';
// material
import { Button } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import { Tab, Tabs } from '@mui/material';

// components
import { MotionContainer } from '../../../../components/animate';
import getVariant from '../../../components-overview/extra/animate/getVariant';
import BrandListTable from './brand_list_table';

const BrandRowWrapper = styled('div')(() => ({
  paddingBottom: 10,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%'
}));

export default function BrandList() {
  const navigate = useNavigate();
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <BrandRowWrapper>
        <MotionContainer
          open
          initial="initial"
          component={motion.h4}
          sx={{ typography: 'h4', display: 'flex', overflow: 'hidden' }}
        >
          {'Brand List'.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant('slideInUp')}>
              {letter}
            </motion.span>
          ))}
        </MotionContainer>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={() => navigate('/dashboard/brand/create')}
        >
          {' '}
          + Add New Brand
        </Button>
      </BrandRowWrapper>

      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          TabIndicatorProps={{ sx: { backgroundColor: 'black' } }}
        >
          <Tab disableRipple key="List" label="List" value={String(1)} />
          <Tab disableRipple key="Content" label="Content" value={String(2)} />
        </Tabs>
        <TabPanel key="List" value={String(1)} sx={{ mt: 5 }}>
          <div style={{ height: 800 }}>
            <BrandListTable />
          </div>
        </TabPanel>
        <TabPanel key="Content" value={String(2)} sx={{ mt: 5 }}>
          <>Contest</>
        </TabPanel>
      </TabContext>
    </>
  );
}
