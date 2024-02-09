import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ManagerTeamForm from "@/pages/manager/forms/ManagerTeamForm";
import ManagerPlayersForm from "@/pages/manager/forms/ManagerPlayersForm";
import { FormProvider, useForm } from "react-hook-form";
import ManagerIbanForm from "@/pages/manager/forms/ManagerIbanForm";

const steps = ["Create a team", "Add players", "Add IBAN"];

export default function ManagerCreateTeamForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const methods = useForm();

  const handleNext = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid = await methods.trigger("name");
        break;
      case 1:
        isValid = await methods.trigger("players");
        break;
      case 2:
        isValid = await methods.trigger("iban");
      default:
        break;
    }

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data) => {
    try {
      console.log(data);
      console.log("submitted!");
    } catch (error) {
      console.log(error);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ManagerTeamForm />;
      case 1:
        return <ManagerPlayersForm />;
      case 2:
        return <ManagerIbanForm />
      default:
        return "Unknown step";
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{ width: "100%" }}
        component="form"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === steps.length - 1 && <Button type="submit">Finish</Button>}
              {activeStep !== steps.length - 1 && <Button onClick={handleNext}>Next</Button>}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </FormProvider>
  );
}
