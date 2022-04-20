import './compose.css';
import Oct from '../../assets/octLogo.png';
import { useState } from 'react';
import ComposeForm from './compose2';



const Compose = () =>{    

    let hone = {
        first: "Compose",
        second: "History",
        third: "Saved Templates"
        
    }

    const [hOne, setHOne] = useState(hone.first);
    const [form, setForms] = useState(<ComposeForm />)

    let oct= Oct;

    const changeHOne = (hOne, form) =>{
        setHOne(hOne);
        setForms(form)
    }

    return (
        <div className="grids-container">
            <div className="logo">
                <img src={oct} alt="octsend logo" />
            </div>
            <div className="left-section-compose">
                <div className="header-2">
                    <h2 onClick={()=>changeHOne(hone.first, <ComposeForm /> )}>Compose</h2>
                    <h2 onClick={()=>changeHOne(hone.second)}>History</h2>
                    <h2 onClick={()=>changeHOne(hone.third)}>Saved Templates</h2>
                    <h2>Log Out</h2> 
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