import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'; // Updated import

function Bookingscreen() {
    const { roomid, fromdate: fromdateParam, todate: todateParam } = useParams();
    const navigate = useNavigate(); // Initialize navigate for redirection
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null);
    const [bookingError, setBookingError] = useState(null);
    const [totalamount, setTotalamount] = useState(0);

    // Convert URL parameters to moment objects
    const fromdate = moment(fromdateParam, 'DD-MM-YYYY', true);
    const todate = moment(todateParam, 'DD-MM-YYYY', true);
    const isDateValid = fromdate.isValid() && todate.isValid();
    const totaldays = isDateValid ? moment.duration(todate.diff(fromdate)).asDays() + 1 : 0;

    useEffect(() => {
        if (!localStorage.getItem('currentUser')) {
            navigate('/login');
            return;
        }
        const fetchRoom = async () => {
            try {
                setLoading(true);
                const response = await axios.post('/api/rooms/getroombyid', { roomid });
                const roomData = response.data;
                setRoom(roomData);

                if (roomData && roomData.rentperday && isDateValid) {
                    setTotalamount(roomData.rentperday * totaldays);
                }

                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        };

        fetchRoom();
    }, [roomid, totaldays, isDateValid]);

    if (!isDateValid) {
        return <Error message="Invalid date format" />;
    }

    async function onToken(token) {
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate: fromdate.format('DD-MM-YYYY'),
            todate: todate.format('DD-MM-YYYY'),
            totalamount,
            totaldays,
            token,
        };

        try {
            setLoading(true);
            const result = await axios.post('/api/bookings/bookroom', bookingDetails);
            console.log(result.data);

            // Success alert using SweetAlert2
            Swal.fire({
                title: "Congratulations",
                text: "Your room is booked successfully",
                icon: "success",
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/profile'); // Redirect to /bookings after user clicks "OK"
                }
            });

            setLoading(false);
        } catch (error) {
            console.error('Booking failed:', error.response);
            setBookingError(error.response?.data?.message || 'Booking failed. Please try again.');
            
            // Error alert using SweetAlert2
            Swal.fire({
                title: "Oops",
                text: "Something went wrong",
                icon: "error",
                confirmButtonText: "OK"
            });

            setLoading(false);
        }
    }

    return (
        <div className="m-5">
            {loading ? (
                <Loader />
            ) : room ? (
                <div>
                    <div className="row justify-content-center mt-5 bs">
                        <div className="col-md-6">
                            <h1>{room.name}</h1>
                            <img src={room.imageurls[0]} className="bigimg" alt={room.name} style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
                        </div>
                        <div className="col-md-5">
                            <div style={{ textAlign: 'right' }}>
                                <h1>Booking Details</h1>
                                <hr />
                                <b>
                                    <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                    <p>From Date: {fromdate.format('DD-MM-YYYY')}</p>
                                    <p>To Date: {todate.format('DD-MM-YYYY')}</p>
                                    <p>Total Days: {totaldays}</p>
                                </b>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <b>
                                    <h1>Amount</h1>
                                    <hr />
                                    <p style={{ color: 'blue' }}>Rent per day: {room.rentperday}</p>
                                    <p style={{ color: 'red' }}>Total Amount: {totalamount}</p>
                                </b>
                            </div>
                            <div style={{ float: 'right' }}>
                                <StripeCheckout
                                    amount={totalamount * 100}
                                    token={onToken}
                                    currency="INR"
                                    stripeKey="pk_test_51Q1vj2G2z0L2tb5odPaOxLhd0P36nm1tlYJFDXGZpnlHYPXYhu0CYRJmbLo55xGoXFyfWtUOBMThrBqFklCef9M800eFp5CeYH"
                                >
                                    <button className="btn btn-primary">Pay Now</button>
                                </StripeCheckout>
                            </div>
                            {bookingError && <p style={{ color: 'red' }}>{bookingError}</p>}
                        </div>
                    </div>
                </div>
            ) : (
                <Error />
            )}
        </div>
    );
}

export default Bookingscreen;
