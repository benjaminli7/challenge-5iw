import MembersView from "@/pages/manager/MembersView";
import TeamView from "@/pages/manager/TeamView";
import WithdrawView from "@/pages/manager/WithdrawView";
import { Alert, Box, Card, Tab, Tabs } from "@mui/material";
import React from "react";

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
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function ManagerTeamView({ team, games }) {
  const [value, setValue] = React.useState(0);
  console.log(team);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {!team?.isApproved && (
        <Alert severity="error">Your team hasn't been approved yet!</Alert>
      )}
      <Card variant="outlined" sx={{ height: "100%", mt: 3 }}>
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
            <MembersView team={team} games={games} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <WithdrawView team={team} />
          </CustomTabPanel>
        </Box>
      </Card>
    </>
  );
}

export default ManagerTeamView;
