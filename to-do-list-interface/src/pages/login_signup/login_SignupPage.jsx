import CreateAccount from "../../components/createAccount"
import Login from "../../components/login"
import { useNavigate, useParams } from "react-router-dom"

function LoginSignUpPage(){
    const {type_singin} = useParams()

    return(
        <>
        <div>
            <div>
                <img>
                </img>
            </div>
            <div>
                {type_singin == 'login' ? <Login/> : <CreateAccount is_create_by_admin={true} is_edit={false} />}
            </div>
        </div>
        </>
    )
}

export default LoginSignUpPage