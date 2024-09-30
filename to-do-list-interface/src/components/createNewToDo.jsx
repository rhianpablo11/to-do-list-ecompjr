import { useState } from "react"
import { save_cookie_token, get_token } from '../utils/utils'

function CreateNewToDo(){
    const [description, setDescription] = useState('')
    const [isErrror, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const addNewToDo = async () => {
        try{
            const urlCommunicate = 'http://localhost:8000'+''
            setIsLoading(true)
            const response = await fetch(urlCommunicate, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${get_token()}`
                },
                body: JSON.stringify({
                    "description": description
                })
            })

            if(response.ok){
                const responseJson = await response.json()
                save_cookie_token(responseJson['token'])
                setIsLoading(false)
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
        <div>
            Adicionar uma nova ToDo
            <div>
                <p>Descrição:</p>
                <input  value={description}
                        placeholder="Insira a descrição da ToDo"
                        type="text"
                        required
                        onChange={()=>setDescription(event.target.value)}
                        ></input>

                <button>
                    Cancelar
                </button>
                <button onClick={addNewToDo}>
                    Adicionar
                </button>
            </div>
        </div>
        </>
    )
}



export default CreateNewToDo