import React from 'react'
import ManagerPlayerForm from '@/pages/manager/forms/ManagerPlayerForm';
import { useTeams } from '@/hooks/models/useTeams';
import { toast } from 'sonner';

function ManagerPlayerCreateForm({ team, handleDialogClose, games }) {
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
  return <ManagerPlayerForm onSubmit={onSubmit} actionType="create" games={games} />;
}

export default ManagerPlayerCreateForm