import { TextField } from '@mui/material';
import React from 'react'

function ManagerTeamForm() {
  return (
    <div>
      {/* <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
        /> */}
        <h1>Team Form</h1>
    </div>
  );
}

export default ManagerTeamForm