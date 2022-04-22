import '../compose/compose.css';
import { useState, useEffect } from 'react';

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
                    <button>Edit</button>
                    <button>Send Now</button>
                </div>                
            </div>
            ))

        }           
        </div>
    )
}

export default SavedTemplates;