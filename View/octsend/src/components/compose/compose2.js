import './compose.css';
import { useState } from 'react';

const ComposeForm = () =>{
    const API_KEY="4f5fb95b491c5a5775562276dd02ac99ffa555caf5af263e4624284ae0e972d6";
    const USER_NAME = "octosenda";


    const [messageSubject, setMessageSubject] = useState("");
    const [messageBody, setMessageBody] = useState("");
    const [contacts, setContacts] = useState([]);

    const handleMessageSubject = (e) => {
        setMessageSubject(e.target.value);
    }

    const handleMessageBody = (e) => {
        setMessageBody(e.target.value);
    }

    const handleMessageReceiver = (e) => {
        setContacts(e.target.value)
    }

    const clearInputs = (e) => {
        e.preventDefault();
        
        setContacts("");
        setMessageSubject("");
        setMessageBody("");
    }
    
    const handleTemplate = async (e) => {
        e.preventDefault();
        try {
            const body =  { messageSubject, messageBody, contacts };
            const response = await fetch("https://octosenda.herokuapp.com/templates", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            });
        } catch (err) {
            console.error(err.message);
        }
        setContacts("");
        setMessageSubject("");
        setMessageBody("");
    }

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const splitContacts = contacts.split(";");
            const body = {messageBody, splitContacts};
            const response = await fetch("https://octosenda.herokuapp.com/messages/send_message", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            });
            
            splitContacts.forEach(async (messageReceiver) => {
                const body =  { messageSubject, messageBody, messageReceiver };
                const response = await fetch("https://octosenda.herokuapp.com/messages", {
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

    return(   
        <>    
            <div className="main-message">   
                                                      
                <div className="form-section">
                    <form>
                        <input type="text" onChange={handleMessageReceiver} value={contacts} placeholder="Enter a Number" id="compose-number" />
                        <br />
                        <input type="text" onChange={handleMessageSubject} value={messageSubject} placeholder="Subject" id="compose-subject"/>
                        <br />
                        <textarea type="text" onChange={handleMessageBody} value={messageBody} placeholder="Message..." className="message-mobile" id="message " required></textarea>
                        <button onClick={handleTemplate}>Save Templates</button>
                        <button onClick={handleSend}>Send Now</button>
                        <button onClick={clearInputs}>Clear</button>
                    </form>   
                </div>                            
            </div>
        </> 
    )
}

export default ComposeForm;