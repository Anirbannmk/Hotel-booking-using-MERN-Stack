import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img
          src={room.imageurls[0]}
          className="smallimg"
          alt="Room"
          onError={(e) => console.log("Error loading image:", e.target.src)}
        />
      </div>
      <div className="col-md-7 d-flex flex-column justify-content-between">
        <div>
          <h1>{room.name}</h1>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </div>
          

        <div className="justify-content-start mt-0">
          {(fromdate&&todate)&&(
 <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
 <button className="btn bg-black text-white mr-2">Book Now</button>
</Link>
          )}
         
          <button className="btn bg-black text-white" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel interval={null} indicators={true} controls={true}>
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={url} alt={`Room view ${index}`} />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
