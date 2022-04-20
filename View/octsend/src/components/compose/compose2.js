import './compose.css';

const ComposeForm = () =>{
    return(        
        <div className="main-message">                                                           
            <div className="form-section">
                <form>
                    <input type="tel" placeholder="Enter a Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="compose-number" required/>
                    <br />
                    <input type="text" placeholder="Subject" id="compose-subject"/>
                    <br />
                    <textarea type="text" placeholder="Message..." class="message-mobile" id="message " required></textarea>
                    <button>Save as Template</button>
                    <button>Send Now</button>
                    <button>Send Later</button>
                </form>   
            </div>                            
        </div>            
       
    )
}

export default ComposeForm;