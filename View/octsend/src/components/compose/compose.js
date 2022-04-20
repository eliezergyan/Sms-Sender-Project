import './compose.css';
import Oct from '../../assets/octLogo.png';



const Compose = () =>{

    let oct= Oct;

    return (
        <div className="grids-container">
            <div className="logo">
                <img src={oct} alt="octsend logo" />
            </div>
            <div className="left-section-compose">
                <div className="header-2">
                    <h2>Compose</h2>
                    <h2>History</h2>
                    <h2>Saved Templates</h2> 
                </div>            
            </div>
            <div className="main-section">            
                    <h1>Compose</h1>
                    <div className="main-message-section">
                        <div className="main-message">                                                           
                            <div className="form-section">
                                <form>
                                    <input type="number" placeholder="Enter a Number" id="compose-number" />
                                    <br />
                                    <input type="text" placeholder="Subject" id="compose-subject"/>
                                    <br />
                                    <textarea type="text" placeholder="Message..." class="message-mobile" id="message " required></textarea>
                                    <button>Save Templates</button>
                                    <button>Send Now</button>
                                    <button>Send Later</button>
                                </form>   
                            </div>                            
                        </div>            
                </div>    
            </div>
        </div>  
    )
}

export default Compose;