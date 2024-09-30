import { useState } from "react"
import { save_cookie_token } from '../utils/utils'
import { useNavigate} from "react-router-dom"

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isErrror, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const loginRequest = async () => {
        try{
            const urlCommunicate = 'http://localhost:8000'+''
            setIsLoading(true)
            const response = await fetch(urlCommunicate, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })

            if(response.ok){
                const responseJson = await response.json()
                save_cookie_token(responseJson['token'])
                setIsLoading(false)
                navigate('/dashboard')
            } else{
                setIsLoading(false)
                setIsError(true)
            }
        } catch(e){
            setIsLoading(false)
            setIsError(true)
        }   
    }


    return(
        <>
            <div className="text-white flex-row h-64 w-80 rounded-xl p-4 bg-opacity-25 bg-slate-200">
                <div >
                    <h1 className="w-full font-medium h-10 text-2xl">Login into account</h1>
                </div>
                <div className="flex-row w-full">
                    <div className="flex-row w-full justify-center ">
                        <p className="text-start ml-4">Email:</p>
                        <input  className=" flex m-auto w-11/12 p-2  rounded-sm bg-opacity-25 bg-slate-200 text-white text-white placeholder:text-white" 
                                value={email}
                                placeholder="Insira seu email"
                                type="email"
                                required
                                onChange={()=>setEmail(event.target.value)}
                                ></input>
                    </div>
                    <div className="flex-row ">
                        <p className=" flex justify-self-start  ml-4">Senha:</p>
                        <input  className=" flex m-auto w-11/12 p-2 justify-self-start rounded-sm bg-opacity-25 bg-slate-200 text-white placeholder:text-white"
                                value={password}
                                placeholder="Insira sua senha"
                                type="password"
                                required
                                onChange={()=>setPassword(event.target.value)}
                                ></input>
                        <button className=" m-auto p-2 flex justify-self-end bg-gray-800 px-3 py-2 rounded-md my-3" onClick={loginRequest}>
                            Login
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Login