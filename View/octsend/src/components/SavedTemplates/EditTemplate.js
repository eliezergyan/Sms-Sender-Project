import React, { useState } from "react";

const EditTemplate = ({ template }) => {
    const [templateSubject, setTemplateSubject] = useState(template.template_subject);
    const [templateBody, setTemplateBody] = useState(template.template_body);
    const [template_contacts, setTemplatesContacts] = useState(template.template_contacts);

    const handleTemplateSubject = (e) => {
        setTemplateSubject(e.target.value);
    }

    const handleTemplateBody = (e) => {
        setTemplateBody(e.target.value);
    }

    const handleTemplateReceiver = (e) => {
        setTemplatesContacts(e.target.value)
    }


    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const splitContacts = template_contacts.split(";");
            const body = {templateBody, splitContacts};
            const response = await fetch("https://octosenda.herokuapp.com/templates/send_message", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            });
            
            splitContacts.forEach(async (messageReceiver) => {
                const body =  { templateSubject, templateBody, messageReceiver };
                const response = await fetch("https://octosenda.herokuapp.com/templates/message", {
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
        <button type="button"  data-toggle="modal" data-target={`#id${template.template_id}`}>
        Edit
        </button>

        <div className="modal" id={`id${template.template_id}`}>
        <div className="modal-dialog">
            <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Edit Template</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
            <form>
                <div className="form-group">
                <input type="text" className="form-control" onChange={handleTemplateReceiver} id="formGroupExampleInput" value={template_contacts}/>
                </div>
                <div className="form-group">
                <label htmlfor="formGroupExampleInput">Subject</label>
                <input type="text" className="form-control" onChange={handleTemplateSubject} id="formGroupExampleInput" value={templateSubject}/>
                </div>
                <div className="form-group">
                <label htmlfor="exampleFormControlTextarea1">Message Body</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" onChange={handleTemplateBody} rows="3" value={templateBody}></textarea>
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




export default EditTemplate;