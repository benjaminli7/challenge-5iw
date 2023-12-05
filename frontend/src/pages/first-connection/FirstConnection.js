import React from 'react'
import { useAuthUser } from 'react-auth-kit'
import { Navigate } from 'react-router-dom';

function FirstConnection() {
    const auth = useAuthUser();
    const isFirstConnection = auth().user.isFirstConnection;
    if(isFirstConnection === false) {
        return <Navigate to="/" replace />;
    }
  return (
    <div>FirstConnection</div>
  )
}

export default FirstConnection