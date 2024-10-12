import React ,{useState,useEffect}from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'
import { Divider, Flex, Tag } from 'antd';
const {TabPane}=Tabs
 function Profilescreen() {
    const user=JSON.parse(localStorage.getItem('currentUser'))
    useEffect(()=>{
        if(!user){
            window.location.href='/login'
        }
    })
  return (
    <div>
     <Tabs defaultActiveKey='1'>
        <TabPane tab="Profile" key="1">
         <h1>My Profile</h1><br/>
         <h1>Name:{user.name}</h1>
         <h1>Email:{user.email}</h1>
         <h1>isAdmin:{user.isAdmin?'YES':'NO'}</h1>
         </TabPane>
        <TabPane tab="Bookings" key="2">
            <MyBookings/>
        </TabPane>
     </Tabs>
    </div>
  )
}
export default Profilescreen;



export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      // Create an async function within useEffect
      const fetchBookings = async () => {
        try {
          setLoading(true);
          const { data } = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
          console.log(data);
          setBookings(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError(true);
        }
      };
  
      fetchBookings();
    }, []); 
   async function cancleBooking(bookingid,roomid){
    try {
        setLoading(true)
        const result=(await axios.post("/api/bookings/cancelbooking",{bookingid,roomid})).data
        console.log(result);
        Swal.fire('Congrats',"Your booking has been cancelled",'success').then(result=>{
          window.location.reload()
        })
    } catch (error) {
        console.log(error);
        Swal.fire('Oops','Something went wrong','error')
    }
   }
    return (
      <div>
        <div className='row'>
          <div className='.col-md-6'></div>
          {loading && <Loader />}
          {error && <Error />}
          {bookings && bookings.map(booking => (
            <div className='bs' key={booking._id}>
              <h1>{booking.room}</h1>
              <p><b>BookingId:</b> {booking._id}</p>
              <p><b>CheckIn:</b> {booking.fromdate}</p>
              <p><b>CheckOut:</b> {booking.todate}</p>
              <p><b>Amount:</b> {booking.totalamount}</p>
              <p><b>Status:</b> {booking.status === 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) :(<Tag color="green">CONFORM</Tag>)}</p>
              {booking.status!=='cancelled'&&(<div style={{ textAlign: 'right' }}>
                <button className='btn btn-primary' onClick={()=>{cancleBooking(booking._id,booking.roomid)}}>CANCEL BUTTON</button>
              </div>)}
            </div>
          ))}
        </div>
      </div>
    );
  }