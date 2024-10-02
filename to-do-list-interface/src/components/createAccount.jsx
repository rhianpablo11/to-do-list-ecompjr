import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"
import { get_token, save_cookie_token } from '../utils/utils'
import propsTypes from 'prop-types'

function CreateAccount(props){
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isErrror, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [handleClick, setHandleClick] = useState(false)
    const [urlCommunicate, setUrlCommunicate] = useState('')
    const navigate = useNavigate()
    
    useEffect(()=>{
        setIsShow(props.is_create_by_admin) 
    },[props.is_create_by_admin] )
    

    const handlingClick = (event) =>{
        if(handleClick){
            setHandleClick(false)
        } else{
            setHandleClick(true)
            if(event.target.innerHTML == 'Salvar'){
                saveAccountRequest()
            }else if(event.target.innerHTML == 'Cadastrar'){
                let verifyCheckBox = document.getElementById('isAdminCheck');
                if(verifyCheckBox.checked){
                    setIsAdmin(true)
                } else{
                    setIsAdmin(false)
                }
                
                createAccountRequest()
            }else{
                setIsShow(false)
            }
        }
    }
    

    const createAccountRequest = async () => {
        try{
            if(isAdmin){
                setUrlCommunicate('http://localhost:8000'+'/user/cadastro/admin')
            } else{
                setUrlCommunicate('http://localhost:8000'+'/user/cadastro/common')
            }
            console.log('ioqhrwqhr   '+urlCommunicate)
            setIsLoading(true)
            const response = await fetch(urlCommunicate, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    'nome': nome,
                    'sobrenome': sobrenome,
                    'telephone': telephone,
                    "is_admin": isAdmin
                })
            })

            if(response.ok){
                const responseJson = await response.json()
                save_cookie_token(responseJson['token'])
                setIsLoading(false)
                navigate('/dashboard')
                setIsShow(false)
            } else{
                setIsLoading(false)
                setIsError(true)
                setIsShow(false)
            }
        } catch(e){
            setIsLoading(false)
            setIsError(true)
            setIsShow(false)
        }   
    }


    const saveAccountRequest = async () => {
        try{
            const urlCommunicate = 'http://localhost:8000'+'update/'+props.userID
            setIsLoading(true)
            const response = await fetch(urlCommunicate, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${get_token()}`
                },
                body: JSON.stringify({
                    "email": email,
                    'nome': nome,
                    'sobrenome': sobrenome,
                    'telephone': telephone
                })
            })

            if(response.ok){
                const responseJson = await response.json()
                
                setIsLoading(false)
                setIsShow(false)
            } else{
                setIsLoading(false)
                setIsError(true)
                setIsShow(false)
            }
        } catch(e){
            setIsLoading(false)
            setIsError(true)
            setIsShow(false)
        }   
    }



    if(isShow){
        return(
            <>  
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
                <div className="text-white flex-row w-80 rounded-xl p-4 bg-opacity-25 bg-slate-200 " >
                    <div className="flex justify-between">
                        <h1 className="w-full font-medium h-10 text-2xl">{props.is_edit ? 'Editar Conta' : 'Create account'}</h1>
                        <button 
                            onClick={handlingClick}
                            className=" bg-opacity-25 bg-slate-200 p-2 rounded-md">
                            Fechar
                        </button>
                    </div>
                    <div  className="flex-row w-full">
                        <p className="text-start ml-4">Nome:</p>
                        <input  className=" flex m-auto w-11/12 p-2  rounded-sm bg-opacity-25 bg-slate-200 text-white placeholder:text-white"
                                value={nome}
                                placeholder="Insira seu nome"
                                type="text"
                                required
                                onChange={()=>setNome(event.target.value)}
                                ></input>
                        
                        <p  className="text-start ml-4">Sobrenome:</p>
                        <input  className=" flex m-auto w-11/12 p-2  rounded-sm bg-opacity-25 bg-slate-200 text-white placeholder:text-white"
                                value={sobrenome}
                                placeholder="Insira seu sobrenome"
                                type="text"
                                required
                                onChange={()=>setSobrenome(event.target.value)}
                                ></input>
                        
                        <p  className="text-start ml-4">Telephone:</p>
                        <input  className=" flex m-auto w-11/12 p-2  rounded-sm bg-opacity-25 bg-slate-200 text-white placeholder:text-white"
                                value={telephone}
                                placeholder="75 98765 - 4321"
                                type="text"
                                required
                                onChange={()=>setTelephone(event.target.value)}
                                ></input>
    
                        <p  className="text-start ml-4">Email:</p>
                        <input className=" flex m-auto w-11/12 p-2  rounded-sm bg-opacity-25 bg-slate-200 text-white placeholder:text-white"
                                value={email}
                                placeholder="Insira seu email"
                                type="email"
                                required
                                onChange={()=>setEmail(event.target.value)}
                                ></input>
                        {props.is_edit ? null : 
                                <div>
                                    <p  className="text-start ml-4">Senha:</p>
                                    <input className=" flex m-auto w-11/12 p-2  rounded-sm bg-opacity-25 bg-slate-200 text-white placeholder:text-white"
                                            value={password}
                                            placeholder="Insira sua senha"
                                            type="password"
                                            required
                                            onChange={()=>setPassword(event.target.value)}
                                            ></input>
                                    <p  className="text-start ml-4">Admin:</p>
                                    <input className="m-auto w-11/12 p-2  rounded-sm bg-opacity-25 bg-slate-200 text-white placeholder:text-white"
                                            
                                            type="checkbox"
                                            id='isAdminCheck'
                                            ></input>
                                </div>}
                        

                        {props.is_edit ?                 
                                    <button className=" m-auto p-2 flex justify-self-end bg-opacity-25 bg-slate-200 px-3 py-2 rounded-md my-3"  onClick={handlingClick}>
                                        Salvar
                                    </button>:
                                    <button className=" m-auto p-2 flex justify-self-end  bg-opacity-25 bg-slate-200 px-3 py-2 rounded-md my-3"  onClick={handlingClick}>
                                        Cadastrar
                                    </button>}
                        
                    </div>
                </div>
            </div>
            </>
        )
    } else{
        return null
    }
    
}

CreateAccount.propTypes = {
    is_create_by_admin: propsTypes.bool,
    is_edit: propsTypes.bool,
    userID: propsTypes.number
    
}

CreateAccount.defaultProps = {
    is_create_by_admin: false,
    is_edit: false,
    userID: 0

}

export default CreateAccount