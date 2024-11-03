"use client"
import DashboardHeader from './dashboardHeader';
import Sidebar from './Siderbar';


const DashboardPage = () => {
  
  return (
    <div className='flex h-screen'>
    
      <Sidebar />
      <DashboardHeader />
    </div>
  )
}

export default DashboardPage