import React from 'react'
import { useAuthUser } from "react-auth-kit";
import { useUsers } from '@/hooks/models/useUsers';
import { Link } from 'react-router-dom';

function ManagerView() {
  const auth = useAuthUser();

  const userAuth = auth()?.user;
  const { user, isLoadingUser } = useUsers(userAuth.id);
  if (isLoadingUser) {
    return <div>Loading...</div>
  }

  console.log(user)
  return (
    <div>
      {!user?.ownedTeam && (
        <div>
          <h1>Manager View</h1>
          <p>You don't have a team yet!</p>
          <Link to="/my-team/create">Create a team</Link>
        </div>
      )}

    </div>
  )
}

export default ManagerView