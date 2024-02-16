import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useTeams } from "@/hooks/models/useTeams";
import { useState } from "react";
import useActionHandlers from "@/hooks/useActionHandlers";
import CustomButton from "@/components/commons/CustomButton";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Grid, Stack, Modal } from "@mui/material";
import WithdrawCard from "./components/WithdrawCard";
import { toast } from "sonner";

function WithdrawView({ team }) {
  const { withdrawCoinsMutation } = useTeams(team.id);
  const [modalOpen, setModalOpen] = useState(false);
  const [withdrawCoins, setWithdrawCoins] = useState(0);

  const { openDialog, handleDialogClose, handleOpenDialog } =
    useActionHandlers();

  const handleWithdrawConfirmed = async () => {
    try {
      const data = {
        withDrawnedCoins: withdrawCoins,
      };
      await withdrawCoinsMutation.mutateAsync(data);
      handleDialogClose();
      toast.success(`$${withdrawCoins} has been sent to your account!`);
    } catch (error) {
      console.log(error);
      toast.error("Error sending withdraw request!");
    }
  };

  const withdraws = [
    {
      coins: 50,
      euro: 5,
      img: "https://www.pngitem.com/pimgs/m/146-1468479_coin-png-coin-png-transparent-png.png",
    },
    {
      coins: 100,
      euro: 10,
      img: "https://www.example.com/coin100.png",
    },
    {
      coins: 200,
      euro: 20,
      img: "https://www.example.com/coin200.png",
    },
    {
      coins: 500,
      euro: 50,
      img: "https://www.example.com/coin500.png",
    },
  ];
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h4" className="titleBorder">
          Withdraw your coins
        </Typography>
        <Typography variant="h5" align="center">
          Your team has{" "}
          <MonetizationOnIcon sx={{ color: "gold", marginRight: 1 }} />
          {team.coins}
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {withdraws.map((withdraw, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <WithdrawCard
                data={withdraw}
                teamCoins={team.coins}
                handleOpenDialog={handleOpenDialog}
                setWithdrawCoins={setWithdrawCoins}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Withdraw confirmation</DialogTitle>
        <DialogContent>
          <Typography align="center">
            Are you sure you want to withdraw?
          </Typography>
        </DialogContent>
        <DialogActions>
          <CustomButton
            isSubmitting={withdrawCoinsMutation.isLoading}
            variant="contained"
            color="primary"
            onClick={() => handleWithdrawConfirmed()}
          >
            Confirm
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default WithdrawView;
