import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [duplicaterooms, setDuplicateRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const navigate = useNavigate();
  const [searchkey, setsearchkey] = useState('');
  const [type, settype] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/rooms/getallrooms');
        const data = response.data;
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates) {
    if (dates && dates.length === 2) {
      setfromdate(dates[0].format('DD-MM-YYYY'));
      settodate(dates[1].format('DD-MM-YYYY'));
    }
  }

  function filterBySearch() {
    const temprooms = duplicaterooms.filter(room =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setRooms(temprooms);
  }

  function filterByType(e) {
    settype(e);
    console.log("Selected type:", e); // Log selected type
    console.log("Available rooms:", duplicaterooms); // Log all available rooms

    if (e === 'all') {
      setRooms(duplicaterooms);
    } else {
      const temprooms = duplicaterooms.filter(room => {
        console.log("Room type:", room.type); // Log each room type
        return room.type.toLowerCase() === e.toLowerCase(); // Filter based on selected type
      });
      setRooms(temprooms);
      console.log("Filtered rooms:", temprooms); 
    }
  }

  const handleRoomClick = (room) => {
    if (fromdate && todate) {
      navigate(`/book/${room._id}/${fromdate}/${todate}`);
    } else {
      alert("Please select a date range before booking.");
    }
  };

  return (
    <div className='container-fluid p-0'>
      <div className='row' style={{ marginTop: '40px' }}>
        <div className="col-md-2 mb-3">
          <RangePicker format={'DD-MM-YYYY'} onChange={filterByDate} />
        </div>
        <div className='col-md-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search rooms'
            value={searchkey}
            onChange={(e) => setsearchkey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className='form-control'
            value={type}
            onChange={(e) => filterByType(e.target.value)}
            style={{ height: 'auto', padding: '0.375rem 0.75rem' }}
          >
            <option value="all">ALL</option>
            <option value="deluxe">DELUXE</option> {/* Updated to match room types */}
            <option value="non deluxe">NON DELUXE</option> {/* Updated to match room types */}
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {error ? (
          <Error />
        ) : (
          rooms.map((room) => (
            <div className='col-md-9 mt-2' key={room._id}>
              <Room room={room} onClick={() => handleRoomClick(room)} fromdate={fromdate} todate={todate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
