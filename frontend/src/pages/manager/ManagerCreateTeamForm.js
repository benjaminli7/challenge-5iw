import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ManagerTeamForm from "@/pages/manager/forms/ManagerTeamForm";
import { FormProvider, useForm } from "react-hook-form";
import ManagerIbanForm from "@/pages/manager/forms/ManagerIbanForm";
import { useAuthUser } from "react-auth-kit";
import { useTeams } from "@/hooks/models/useTeams";
import { toast } from "sonner";
import CustomButton from "@/components/commons/CustomButton";
import { useNavigate } from "react-router-dom";

const steps = ["Create a team", "Add IBAN"];

export default function ManagerCreateTeamForm() {
  const auth = useAuthUser();
  const user = auth()?.user;
  const [activeStep, setActiveStep] = React.useState(0);
  const methods = useForm();
  const { addTeamMutation } = useTeams()
  let navigate = useNavigate();
  const handleNext = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid = await methods.trigger("name");
        break;
      case 1:
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

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        manager: `/api/users/${user.id}`,
      };
      await addTeamMutation.mutateAsync(dataToSend);
      toast.success("Team created successfully!");
      return navigate("/my-team");

    } catch (err) {
      let error = err.response.data
      toast.error(error.violations[0].message);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ManagerTeamForm />;
      case 1:
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
              {activeStep === steps.length - 1 && (
                <CustomButton
                  type="submit"
                  variant="contained"
                  isSubmitting={methods.formState.isSubmitting}
                >
                  Finish
                </CustomButton>
              )}
              {activeStep !== steps.length - 1 && (
                <Button onClick={handleNext}>Next</Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </FormProvider>
  );
}
