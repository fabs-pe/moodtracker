import React from 'react'
import Dashboard from '../../../components/Dashboard';
import Main from '../../../components/Main';
import Login from '../../../components/Login';
import { useAuth } from '../../../context/AuthContext';
import Loading from '../../../components/loading';
export const metadata = {
  title: "Mood ⋅ Dashboard ",
};

export default function DashboardPage() {

//    Auth for login or dashborad display
    // const isAuthenticated = true


  return (
    <Main>
        <Dashboard />
    </Main>
  )
}
