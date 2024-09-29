import { useState } from "react"


function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <>
            <div>
                <div>
                    <h1>Login into account</h1>
                </div>
                <div>
                    <p>Email:</p>
                    <input  value={email}
                            placeholder="Insira seu email"
                            type="email"
                            required
                            onChange={()=>setEmail(event.target.value)}
                            ></input>
                    <p>Senha:</p>
                    <input  value={password}
                            placeholder="Insira sua senha"
                            type="password"
                            required
                            onChange={()=>setPassword(event.target.value)}
                            ></input>
                    <button>
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login