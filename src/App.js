import { clientApiCall } from './config';
import './App.css';
import Table from './Components/MaterialTable';
import React,{ useEffect, useState } from 'react';
import From from './Components/Form';


function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [formData, setFromData] = useState({})
  const [formUpdate, setFromUpdate] = useState(false);
  const [enableForm, setEnableFrom] = useState(false)
  const [focus, setFocus] = useState(false);

  const handleSubmit = async(event) =>{
    event.preventDefault();
  console.log("e :", formData);
    try {
      let res;
      if (!formUpdate) {
        res = await clientApiCall('/user/store', 'post', formData, null);
      }else{
        res = await clientApiCall('/user/update', 'put', formData, null)
      }
       
      console.log("submited",res);
      setEnableFrom(false);
      setFocus(!focus);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  const getAllUsers = async() =>{
    try {
      const response = await clientApiCall('/user', 'get', null, null);
      console.log("response : ", response);
      setAllUsers(response.data.data)
    } catch (error) {
      console.log("error occured in get all users", error);
    }
  }

  const deleteUser = async(id) =>{
    try {
      
      await clientApiCall(`/user/delete/${id}`, 'delete', null, null);
      setFocus(!focus);
      return;
    } catch (error) {
      throw new Error(error);
    }
   
  }

  const handleChange = async(event) =>{
    const {name, value} = event.target;
    formData[name] = value;
      setFromData({
        [name]: value,
        ...formData
      });
      console.log("on change form ", {name, value});
  }
  useEffect(() => {
    return ()=>{
      getAllUsers()
    }
  },[focus]);
  
  return (<div className='m-8'>
    {enableForm && <From handleChange={handleChange} handleSubmit={handleSubmit} values={formData} setEnableFrom={setEnableFrom}/>}
 {allUsers.length !== 0  && !enableForm && <Table setEditFrom={setFromData} setEnableFrom={setEnableFrom} data={allUsers} focus={setFocus} deleteUser={deleteUser} setFromUpdate={setFromUpdate}/>}
  </div>);
}

export default App;
