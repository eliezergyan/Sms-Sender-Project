import '../compose/compose.css';
import { useState, useEffect } from 'react';
import EditMessage from './EditMessage';


const Resend = ({message}) => {
    const [messageSubject, setMessageSubject] = useState(message.message_subject);
    const [messageBody, setMessageBody] = useState(message.message_body);
    const [contacts, setContacts] = useState(message.receiver_contact);


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


        } catch (err) {
            console.error(err.message)
        }
    }



    return(
        <button data-target={`#id${message.message_id}`} onClick={handleSend}>Resend</button>
    )
}


const History = () => {

    const [history, setHistory] = useState([]);
    const [spinner, setSpinner] = useState("display");
 

    const getHistory = async () => {
        try {
            const response = await fetch("https://octosenda.herokuapp.com/messages");
            const jsonData = await response.json();
            setSpinner("none")
            
            setHistory(jsonData);

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(()=>{getHistory()},[])


    return(
        <>
            <div className="text-center"  style={{display: `${spinner}`}}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            

            <div className="container-history">
            {history.map(message => (
                <div className="hisory-message-section" key={message.message_id}>
                <div className="hisory-message">
                    <div>
                        <h3>{message.receiver_contact}</h3>
                        <p id="subject">{message.message_subject}</p>
                        <p id="message">{message.message_body}</p>
                    </div>                    
                </div>
                <div className="btn">
                    <EditMessage message={message}/>
                    <Resend message={message} />
                </div>                
                </div>
            ))}
            </div>
        </>

    )
    
}

export default History;