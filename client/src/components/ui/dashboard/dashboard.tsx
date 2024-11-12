"use client"
import DashboardHeader from './dashboardHeader';
import Sidebar from './Siderbar';


const DashboardPage = () => {
  
  return (
    <div>
    <div className='flex h-screen overflow-hidden'>
    
      <Sidebar />
      <div className='flex-1 flex flex-col'>
      <DashboardHeader />
      </div>
      {/* <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
      <DashboardHero />
      </main> */}
      
      
      </div>
      
      </div>
  )
}

export default DashboardPage