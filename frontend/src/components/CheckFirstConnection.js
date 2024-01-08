import React from 'react'
import { useAuthUser } from 'react-auth-kit'

function CheckFirstConnection({ children }) {
    const auth = useAuthUser();
    const isFirstConnection = auth().user.isFirstConnection;
  return children;
}

export default CheckFirstConnection