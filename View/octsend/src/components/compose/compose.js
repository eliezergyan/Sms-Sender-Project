import './compose.css';
import Oct from '../../assets/octLogo.png';
import { useState, useEffect } from 'react';
import ComposeForm from './compose2';
import History from '../history/history';
import SavedTemplates from '../SavedTemplates/savedTemplates';
import { useNavigate } from 'react-router-dom';



const Compose = () =>{
    const API_KEY="8b0225c779bfa167afdabffc7ed58cc7824086720d2770ab735b84ff5a2c41f9";
    const USER_NAME = "octosenda";
    let oct= Oct;
    let navigate = useNavigate();

    const [messageSubject, setMessageSubject] = useState("");
    const [messageBody, setMessageBody] = useState("");
    const [contacts, setContacts] = useState("");

  
    const changeHOne = (hOne, form, color) =>{
        setHOne(hOne);
        setForms(form);        
    }

    const handleMessageSubject = (e) => {
        setMessageSubject(e.target.value);
    }

    const handleMessageBody = (e) => {
        setMessageBody(e.target.value);
    }

    const handleMessageReceiver = (e) => {
        setContacts(e.target.value)
    }

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const splitContacts = contacts.split(";");
            console.log(splitContacts); 
            const body = {messageBody, splitContacts};
            const response = await fetch("http://localhost:5000/messages/send_message", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            });


            splitContacts.forEach(async (messageReceiver) => {
                const body =  { messageSubject, messageBody, messageReceiver };
                const response = await fetch("http://localhost:5000/messages", {
                    method: "POST",
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify(body)
                });
            })

            setContacts("");
            setMessageSubject("");
            setMessageBody("");
           
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="grids-container">
            <div className="logo">
                <img src={oct} alt="octsend logo" />
            </div>
            <div className="left-section-compose">
                <div className="header-2">
                    <h2  onClick={()=>changeHOne(hone.first, <ComposeForm />)}>Compose</h2>
                    <h2  onClick={()=>changeHOne(hone.second, <History />)}>History</h2>
                    <h2  onClick={()=>changeHOne(hone.third, <SavedTemplates />)}>Saved Templates</h2>
                    <h2 onClick={()=> {navigate("/signin")}}>Log Out</h2> 
                </div>            
            </div>
            <div className="main-section">            

                    <h1>Compose</h1>
                    <div className="main-message-section">
                        <div className="main-message">                                                           
                            <div className="form-section">
                                <form>
                                    <input type="text" onChange={handleMessageReceiver} value={contacts} placeholder="Enter a Number" id="compose-number" />
                                    <br />
                                    <input type="text" onChange={handleMessageSubject} value={messageSubject} placeholder="Subject" id="compose-subject"/>
                                    <br />
                                    <textarea type="text" onChange={handleMessageBody} value={messageBody} placeholder="Message..." className="message-mobile" id="message " required></textarea>
                                    <button>Save Templates</button>
                                    <button onClick={handleSend}>Send Now</button>
                                    <button>Send Later</button>
                                </form>   
                            </div>                            
                        </div>            

                <h1>{hOne}</h1>
                <div className="main-message-section">
                       {form}             

                </div>    
            </div>
        </div>  
    )
}

export default Compose;