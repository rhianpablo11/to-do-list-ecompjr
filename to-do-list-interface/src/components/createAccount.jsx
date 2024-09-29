import { useState } from "react"


function CreateAccount(){
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <>
            <div>
                <div>
                    <h1>Login into account</h1>
                </div>
                <div>
                    <p>Nome:</p>
                    <input  value={nome}
                            placeholder="Insira seu nome"
                            type="text"
                            required
                            onChange={()=>setNome(event.target.value)}
                            ></input>
                    
                    <p>Sobrenome:</p>
                    <input  value={sobrenome}
                            placeholder="Insira seu sobrenome"
                            type="text"
                            required
                            onChange={()=>setSobrenome(event.target.value)}
                            ></input>
                    
                    <p>Telephone:</p>
                    <input  value={telephone}
                            placeholder="75 98765 - 4321"
                            type="text"
                            required
                            onChange={()=>setTelephone(event.target.value)}
                            ></input>

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
                        Cadastrar
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateAccount