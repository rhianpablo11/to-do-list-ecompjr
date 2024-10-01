import { useState } from "react"
import { get_token } from "../utils/utils"
import propsTypes from 'prop-types'


function AddNewToDo(props){
    const [descriptionToDo, setDescriptionToDo] = useState('')
    const [isErrror, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const addNewToDo = async () => {
        try{
            const currentDate = new Date()
            const formattedDate = currentDate.getFullYear() + '-' + 
                      String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(currentDate.getDate()).padStart(2, '0')
            const urlCommunicate = 'http://localhost:8000'+'/to-do/add'
            setIsLoading(true)
            const response = await fetch(urlCommunicate, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${get_token()}`
                },
                body: JSON.stringify({
                    "description": descriptionToDo,
                    'status': 'Pendente',
                    'users': props.email,
                    'create_date': formattedDate

                })
            })

            if(response.ok){
                const responseJson = await response.json()
                
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


    return (
        <>
        <div className={'text-white w-full h-full flex-row align-top m-2 p-4'}>
            <h3 className="font-semi-bold text-2xl"> 
                Adicionar uma nova ToDo:
            </h3>
            <div className="h-36">
                <textarea className='px-2 ml-3 w-full h-full text-white bg-gray-800 rounded-md text-start align-text-top resize-none overflow-hidden'
                       maxLength={255}
                       placeholder=""
                       value={descriptionToDo}
                       type="text"
                       onChange={()=>setDescriptionToDo(event.target.value)}>

                </textarea>
            </div>
            <div className="h-full">
                <button onClick={addNewToDo}
                        className="bg-white text-black rounded-md px-5 my-3">
                    Adicionar
                </button>
            </div>
        </div>
        </>
    )
}

AddNewToDo.propTypes = {
    email: propsTypes.string,
    
}

AddNewToDo.defaultProps = {
    email: 'usuario@gmail.com'

}

export default AddNewToDo