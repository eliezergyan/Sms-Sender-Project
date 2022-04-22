import '../compose/compose.css';
import { useState, useEffect } from 'react';

const History = () =>{

    const [history, setHistory] = useState([]);


    const getHistory = async () => {
        try {
            const response = await fetch("https://octosenda.herokuapp.com/messages");
            const jsonData = await response.json();
            
            setHistory(jsonData);

        } catch (err) {
            console.error(err)
        }
    }
 
    useEffect(()=>{getHistory()},[])

    return(
        <>
            <div className="container-history">
            {history.map(data => (
                <div className="hisory-message-section" key={data.message_id}>
                <div className="hisory-message">
                    <div>
                        <h3>{data.receiver_contact}</h3>
                        <p id="subject">{data.message_subject}</p>
                        <p id="message">{data.message_body}</p>
                    </div>                    
                </div>
                <div className="btn">
                    <button>Edit</button>
                    <button>Resend</button>
                </div>                
            </div>

            ))}
            </div>
        </>

    )
    
}

export default History;