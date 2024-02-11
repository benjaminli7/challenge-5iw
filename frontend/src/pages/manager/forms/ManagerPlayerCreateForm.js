import React from 'react'
import ManagerPlayerForm from '@/pages/manager/forms/ManagerPlayerForm';

function ManagerPlayerCreateForm({ team, handleDialogClose }) {
  const { addPlayerMutation } = useTeams(team.id);

    const onSubmit = async (data) => {
      try {
        await addPlayerMutation.mutateAsync(data);
        await handleDialogClose();
        toast.success("Player added to team!");
      } catch (error) {
        console.error("Error creating player:", error);
        toast.error("Error creating player");
      }
    };
  return <ManagerPlayerForm onSubmit={onSubmit} actionType="create" />;
}

export default ManagerPlayerCreateForm