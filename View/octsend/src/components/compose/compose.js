import './compose.css';
import Oct from '../../assets/octLogo.png';
import { useState, useEffect } from 'react';
import ComposeForm from './compose2';
import History from '../history/history';
import SavedTemplates from '../SavedTemplates/savedTemplates';
import { useNavigate } from 'react-router-dom';



const Compose = () =>{
    let oct= Oct;
    let navigate = useNavigate();
    let hone = {
        first: "Compose",
        second: "History",
        third: "Saved Templates"
        
    }

    const [hOne, setHOne] = useState(hone.first);
    const [form, setForms] = useState(<ComposeForm />);
    const [color, setColor] = useState("#009D96") 

  
    const changeHOne = (hOne, form, color) =>{
        setHOne(hOne);
        setForms(form);        
    }


    return (
        <div className="grids-container">
            <div className="logo">
                <img src={oct} alt="octsend logo" />
            </div>
            <div className="left-section-compose">
                <div className="header-2">
                    <h2 onClick={()=>changeHOne(hone.first, <ComposeForm />)}>Compose</h2>
                    <h2 onClick={()=>changeHOne(hone.second, <History />)}>History</h2>
                    <h2 onClick={()=>changeHOne(hone.third, <SavedTemplates />)}>Saved Templates</h2>
                    <h2 onClick={()=> {navigate("/signin")}}>Log Out</h2> 
                </div>            
            </div>
            <div className="main-section">            
                <h1>{hOne}</h1>
                    <div className="main-message-section">
                        {form}             
                    </div>
            </div>
        </div>    
    )
}

export default Compose;