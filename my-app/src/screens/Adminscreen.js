import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';
const { TabPane } = Tabs;

function Adminscreen() {
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || !currentUser.isAdmin) { 
          window.location.href = '/home'; 
        }
      }, []);
  
  return (
    <div className='mt-3 ml-3 mr-3 bs'>
      <h1 className='text-center'>Admin Panel</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1"><Bookings/></TabPane>
        <TabPane tab="Rooms" key="2"><Rooms/></TabPane>
        <TabPane tab="Add Room" key="3"><Addroom/></TabPane>
        <TabPane tab="Users" key="4"><Users/></TabPane>
      </Tabs>
    </div>
  );
  
}

export default Adminscreen;


function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/bookings/getallbookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>
        <table className="table table-border">
          <thead className="bs">
            <tr>
              <th className="table-light">Booking id</th>
              <th className="table-light">User id</th>
              <th className="table-light">Room</th>
              <th className="table-light">From</th>
              <th className="table-light">To</th>
              <th className="table-light">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.room}</td>
                  <td>{moment(booking.fromdate).format("DD-MM-YYYY")}</td>
                  <td>{moment(booking.todate).format("DD-MM-YYYY")}</td>
                  <td>{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function Rooms() {
  const [rooms, setrooms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data= (await axios.get('/api/rooms/getallrooms')).data;
        setrooms(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='row'>
    <div className="col-md-12">
      <h1>Rooms</h1>
      <table className='table table-bordered'>
        <thead className='bs'>
          <tr>
            <th className='table-light'>Room id</th>
            <th className='table-light'>Name</th>
            <th className='table-light'>Type</th>
            <th className='table-light'>Rent per day</th>
            <th className='table-light'>Max count</th>
            <th className='table-light'>Phone Number</th>
          </tr>
        </thead>
        <tbody>{rooms.length&&(rooms.map(room=>{
          return <tr>
            <td>{room._id}</td>
            <td>{room.name}</td>
            <td>{room.type}</td>
            <td>{room.rentperday}</td>
            <td>{room.maxcount}</td>
            <td>{room.phonenumber}</td>
          </tr>
        }))}</tbody>
      </table>
    </div>
    </div>
  );
}

function Users() {
  const [users, setusers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data= (await axios.get('/api/users/getallusers')).data;
        setusers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Users</h1>
        <table className='table  table-bordered'>
        <thead>
        <tr>
         <th className="table-light">User Id</th>
          <th className="table-light">Name</th>
         <th className="table-light">Email</th>
         <th className="table-light">Is Admin</th>
         </tr>
         </thead>
         <tbody>
          {users&&(users.map(user=>{
            return <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin?"YES":"No"}</td>
            </tr>
          }))}
         </tbody>
        </table>
      </div>
    </div>
  )
}


// Adroom  components


export  function Addroom() {
  const [loading, setloading]=useState(false)
  const [error,seterror]=useState()
const [name,setname]=useState('')
const [rentperday, setrentperday]=useState()
const [maxcount,setmaxcount]=useState()
const [description, setdescription]=useState()
const [phonenumber,setphonenumber]=useState()
const [type,settype]=useState()
const [imageurl1, setimageurl1]=useState()
const [imageurl2, setimageurl2]=useState()
const [imageurl3, setimageurl3]=useState()
const [imageurl4, setimageurl4]=useState()
const [imageurl5, setimageurl5]=useState()

async function addRoom(){

const newroom={
  name,
  rentperday,
  maxcount,
  description,
  phonenumber,
  type,
  imageurls:[imageurl1,imageurl2,imageurl3,imageurl4,imageurl5]
};
try{
  setloading(true)
const result= await (await axios.post('/api/rooms/addroom', newroom))
console.log(result)
setloading(false)
Swal.fire('congrats',"your new room added successfully","success").then(result=>{
  window.location.href='/home'
})
}catch(error){
console.log(error)
setloading(false)
Swal.fire("oops !", "something went wrong","error")
}
}


  return (
    <div className="row">
    <div className='col-md-5'>
    {loading && <Loader/>}

<input type="text" className='form-control' placeholder='room name'
value={name} onChange={(e)=>{setname(e.target.value)}}
/>
<input type="text" className='form-control' placeholder='rent per day'
value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}

/>
<input type="text" className='form-control' placeholder='max count'
value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}

/>
<input type="text" className='form-control' placeholder='description'
value={description} onChange={(e)=>{setdescription(e.target.value)}}
/>
<input type="text" className='form-control' placeholder='phone number'
value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}

/>
<input type="text" className='form-control' placeholder='type'
    value={type} onChange={(e)=>{settype(e.target.value)}}
    />

    </div>

    <div className='col-md-5'>
    
<input type="text" className='form-control' placeholder='Image-URL 1'
value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}
/>
<input type="text" className='form-control' placeholder='Image-URL 2'
value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}
/>
<input type="text" className='form-control' placeholder='Image-URL 3'
value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}
/>
<input type="text" className='form-control' placeholder='Image-URL 4'
value={imageurl4} onChange={(e)=>{setimageurl4(e.target.value)}}
/>
<input type="text" className='form-control' placeholder='Image-URL 5'
value={imageurl5} onChange={(e)=>{setimageurl5(e.target.value)}}
/>

<div className='text-right'>
  <button className='btn btn-primary mt-2' onClick={addRoom}>Add Room</button>
</div>
    </div>

    </div>
  )
}
