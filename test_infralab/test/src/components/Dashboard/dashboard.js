import React from 'react';
import SideNav from './sideNav';
import DataList from './dataList';
import './dashboard.css';
export default function Dashboard() { 
    return ( 
    <div className="row dashboardLayout">
        <div className='col-sm-2 sideNavbar'>
            <SideNav />
        </div>
        <div className='col-sm-10'> 
            <DataList />
        </div>
    </div>
    )
}