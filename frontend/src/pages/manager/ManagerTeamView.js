import { Card, Typography, Box, Tabs, Tab } from '@mui/material';
import React from 'react'
import TeamView from '@/pages/manager/TeamView';
import MembersView from '@/pages/manager/MembersView';
import WithdrawView from "@/pages/manager/WithdrawView";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function ManagerTeamView({ team }) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Team" />
            <Tab label="Members" />
            <Tab label="Withdraw" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TeamView team={team} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MembersView team={team} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <WithdrawView team={team} />
        </CustomTabPanel>
      </Box>
    </Card>
  );
}

export default ManagerTeamView;