import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootStrap from 'react-bootstrap';
import './dashboard.css';import axios from 'axios';
export default function DataList() { 
    const [players, setPlayers] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [region, setRegion] = useState(''); 
    const [field, setField] = useState(''); 
    const [searchInput, setSearchInput] = useState('');

 const getPlayersData = async()=>{
    try{
        const data = await axios.get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI");
        setPlayers(data.data); 
        setLoading(true); 
    }catch(e){ console.log(e);
} 
};
 const columns =[ 
    {dataField: "bank_name", text: "Name" }, 
    {dataField: "ifsc", text: "IFSC" }, 
    {dataField: "branch", text: "Branch" }, 
    {dataField: "bank_id", text: "Bank ID" }, 
    {dataField: "address", text: "Address" }, 
]; 
useEffect(( ) => {
    getPlayersData();
},[]);

 const handleCitySelect = (event) => { 
    setRegion(event.target.value); 
    resultList(event.target.value); 
};
 const resultList = (region)=>{
     const playersCity = players.filter(i => i.city.includes(region) ); 
     setPlayers(playersCity);
    if(playersCity.length === 0 && region === 'MUMBAI'){
         getPlayersData(); 
    } 
}
 const handleFieldSelect = (event) => { 
    setField(event.target.value); 
};
 const handleInputChange = (event) => {
    setSearchInput(event.target.value); 
    if(event.target.value === ''){ 
        getPlayersData(); 
    } else{ 
        filterBySearch(event.target.value); 
    } 
}
 const filterBySearch = (search) => { 
    if(field === 'ifsc'){ 
        const playersField = players.filter(j => j.ifsc.toLowerCase().includes(search.toLowerCase()) );
        setPlayers(playersField); 
    } else if(field === 'bank_branch'){ 
        const playersField = players.filter(j => j.bank_branch.toLowerCase().includes(search.toLowerCase()) ); 
        setPlayers(playersField); 
    } else if(field === 'branch_name'){ 
        const playersField = players.filter(j => j.branch_name.toLowerCase().includes(search.toLowerCase()) ); 
        setPlayers(playersField); 
    } else if(field === 'address'){ 
        const playersField = players.filter(j => j.address.toLowerCase().includes(search.toLowerCase()) );
        setPlayers(playersField); 
    } else if(field === 'district'){ 
        const playersField = players.filter(j => j.district.toLowerCase().includes(search.toLowerCase()) );
        setPlayers(playersField); 
    } 
} 
console.log(searchInput); 
return (
    <div> 
        <div className="dashboardLayout"> 
            <div className="filterOption"> 
                <select value={region} onChange={handleCitySelect}> 
                    <option value='' >Select City</option> 
                    <option value='MUMBAI'>MUMBAI</option> 
                    <option value='DELHI'>DELHI</option> 
                    <option value='BANGALORE'>BANGALORE</option> 
                    <option value='PUNE'>PUNE</option> 
                    <option value='KOLKATA'>KOLKATA</option> 
                </select> 
                <select value={field} onChange={handleFieldSelect}> 
                    <option value='' >Select search field</option> 
                    <option value='ifsc'>IFSC</option> 
                    <option value='bank_branch'>Branch</option> 
                    <option value='branch_name'>Branch Name</option> 
                    <option value='address'>Address</option> 
                    <option value='district'>DISTRICT</option> 
                </select> 
                <input placeholder="Search for..." value={searchInput} onChange={handleInputChange} /> 
            </div>
        {loading ?( 
        <BootstrapTable keyField="name" data={players} columns={columns} pagination={paginationFactory()} />
        ): (
        <ReactBootStrap.Spinner animation="border" />)
        } 
        </div> 
    </div> 
    )
}
