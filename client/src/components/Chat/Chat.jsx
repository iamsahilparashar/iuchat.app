import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from 'query-string';

// import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import { useLocation } from "react-router";

import './Chat.css';
import logo from '../../icons/logo1.jpg';
// import onlineIcon from '../../icons/onlineIcon.png'


let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://reactappichat.herokuapp.com/';
  // const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <>
      <div className="outerContainer">
        <nav>
          <img src={logo} className="logo" alt="" />
          <h1 className="main-head" >Welcome to iuChat - A disscussion application</h1>
        </nav>
        <div className="innerContainer">
          {/* <TextContainer users={users} /> */}
          <div>
            <nav >
              <div >
                <i className="fas fa-users cont" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"></i>
              </div>
              <div className="textContainer" >
                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                  <div className="toast-header">
                    <img src={logo} className="rounded me-2" style={{ width: '5%', height: '5%' }} alt="..." />
                    <strong className="me-auto">People chatting</strong>
                    {/* <small className="text-muted">Just Now</small> */}
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
                  <div className="toast-body">
                    {
                      users
                        ? (
                          <div>
                            <h5>
                              {users.map(({ name }) => (
                                <div key={name} >
                                  <i className="fas fa-user"></i>
                                  {name}
                                </div>
                              ))}
                            </h5>
                          </div>
                        )
                        : null
                    }
                  </div>

                </div>
              </div>
            </nav>
          </div>
          <div className="container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;