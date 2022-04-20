import './reset-password.css';
import octLogo from '../../assets/octLogo.png'
import  { useNavigate } from 'react-router-dom';

let Oct = octLogo;
const ResetPassword =()=>{

let navigate = useNavigate();

    return(
        <div className='container'>
            <div className="resetpassword-form">
                <form>
                        <div class="main-logo-res">
                            <img 
                            src={Oct} 
                            alt="octsend logo"
                            onClick={ ()=> {navigate("/")}}
                            />                    
                        </div>
                        
                        <br/>
                        <label id="enter-password">Please enter a new password.</label>
                        <br />
                        <input type="password" placeholder="New Password" id="newPass" />
                        <br/>
                        <input type="password" placeholder="Confirm Password" id="confPass"/>
                        <br />
                        <input type="submit" value="Reset Password" id="res-submit"/>    
                </form>
            </div>            
        </div> 
    )
}

export default ResetPassword;