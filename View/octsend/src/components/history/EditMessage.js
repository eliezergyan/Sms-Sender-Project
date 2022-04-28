import React, { useState } from "react";

const EditMessage = ({ message }) => {
    const [messageSubject, setMessageSubject] = useState(message.message_subject);
    const [messageBody, setMessageBody] = useState(message.message_body);
    const [contacts, setContacts] = useState(message.receiver_contact);

    const handleMessageSubject = (e) => {
        setMessageSubject(e.target.value);
    }

    const handleMessageBody = (e) => {
        setMessageBody(e.target.value);
    }

    const handleMessageReceiver = (e) => {
        setContacts(e.target.value)
    }

    const handleClear = (e) => {
        setMessageSubject("");
        setMessageBody("");
        setContacts("");
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


        } catch (err) {
            console.error(err.message)
        }
    }


    return(
        <>
        <button type="button"  data-toggle="modal" data-target={`#id${message.message_id}`}>
        Edit
        </button>

        <div className="modal" id={`id${message.message_id}`}>
        <div className="modal-dialog">
            <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Edit Message</h4>
                <button type="button" className="close" data-dismiss="modal" onClick={handleClear}>
                    &times;
                </button>
            </div>

            <div className="modal-body">
            <form>
                <div className="form-group">
                <input type="text" className="form-control" onChange={handleMessageReceiver} id="formGroupExampleInput" value={contacts}/>
                </div>
                <div className="form-group">
                <label htmlfor="formGroupExampleInput">Subject</label>
                <input type="text" className="form-control" onChange={handleMessageSubject} id="formGroupExampleInput" value={messageSubject}/>
                </div>
                <div className="form-group">
                <label htmlfor="exampleFormControlTextarea1">Message Body</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" onChange={handleMessageBody} rows="3" value={messageBody}></textarea>
                </div>
            </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn-success" onClick={handleSend} data-dismiss="modal">Send</button>
                <button type="button" className="btn-danger" data-dismiss="modal">Cancel</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}




export default EditMessage;