import '../compose/compose.css';
import { useState, useEffect } from 'react';
import EditTemplate from './EditTemplate';

const TemplateSend = ({template}) => {
    const [templateSubject, setTemplateSubject] = useState(template.template_subject);
    const [templateBody, setTemplateBody] = useState(template.template_body);
    const [template_contacts, setTemplatesContacts] = useState(template.template_contacts);


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

    return (
        <button data-target={`#id${template.template_id}`} onClick={handleSend}>Send</button>
    )

}


const SavedTemplates = () =>{
    const [templates, setTemplates] = useState([]);

    const getTemplates = async () => {
        try {
            const response = await fetch("https://octosenda.herokuapp.com/templates");
            const jsonData = await response.json();
            
            setTemplates(jsonData);

        } catch (err) {
            console.error(err)
        }
    }
 
    useEffect(()=>{getTemplates()},[])

    return(
        <div className="container-history">
        {
            templates.map(template => (
                <div className="hisory-message-section" key={template.template_id}>
                <div className="hisory-message">
                    <div>
                        <h3>{template.template_contacts}</h3>
                        <p id="subject">{template.template_subject}</p>
                        <p id="message">{template.template_body}</p>
                    </div>                    
                </div>
                <div className="btn">
                    <EditTemplate template={template}/>
                    <TemplateSend template={template}/>
                </div>                
            </div>
            ))

        }           
        </div>
    )
}

export default SavedTemplates;