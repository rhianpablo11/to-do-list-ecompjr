import CreateAccount from "../../components/createAccount"
import Login from "../../components/login"
import { useNavigate, useParams } from "react-router-dom"

function LoginSignUpPage(){
    const {type_singin} = useParams()

    return(
        <>
        <div style={{'background':'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'}} 
            className="flex justify-center items-center h-screen">
                <Login/>
        </div>
        </>
    )
}

export default LoginSignUpPage