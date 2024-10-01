import propsTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { get_token } from '../utils/utils'

function ToDoElement(props){
    const [optionsList, setOptionsList] = useState([])
    const [optionSelected, setOptionSelected] = useState('')

    useEffect(()=>{
        if(props.status == 'Pendente'){
            setOptionsList(['Selecione uma opção','Marcar como Concluída', 'Arquivar'])
        } else if(props.status == 'Concluída'){
            setOptionsList(['Arquivar'])
        }
    }, [props.status])

    useEffect(()=>{
        if(optionSelected == 'Arquivar'){
            putToDoInArqchive()
        } else if(optionSelected == 'Marcar como Concluída'){
            putToDoConcluded()
        }
    },[optionSelected])

    const putToDoInArqchive = async () => {
        try{
            const urlCommunicate = 'http://localhost:8000'+'/to-do/delete/'+props.task_id
            const response = await fetch(urlCommunicate, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${get_token()}`
                }
            })
            
        } catch(e){

        }   
    }

    const putToDoConcluded = async () => {
        try{
            const urlCommunicate = 'http://localhost:8000'+'/to-do/update/'+props.task_id+'/concluido'
            const response = await fetch(urlCommunicate, {
                method: 'PATCH',
                headers: {
                    'Authorization': `${get_token()}`
                }
            })
            setOptionSelected('')
            
        } catch(e){

        }   
    }


    return (
        <>
            <div className='bg-gray-700 rounded-lg flex justify-between p-3 my-1' >
                <div className='w-18'>
                    <p className='font-medium'>#{props.task_id}</p>
                    <p className='font-light'>ToDo ID</p>
                </div>
                <div className='w-28'>
                    <p className='font-medium'>{props.create_date}</p>
                    <p className='font-light'>Data da Criação</p>
                </div>
                <div className='w-auto'>
                    <p className='font-medium'>{props.description}</p>
                    <p className='font-light'>Descrição</p>
                </div>
                <div className='w-28'>
                    <p className='font-medium'>{props.status}</p>
                    <p className='font-light'>Status</p>
                </div>
                <div className='w-10'>
                    <select value={optionSelected} onChange={()=>setOptionSelected(event.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' >
                        {optionsList.map((option, index)=>(
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    
                </div>
            </div>
        </>
    )
}

ToDoElement.propTypes = {
    create_date: propsTypes.object.isRequired,
    description: propsTypes.string,
    status: propsTypes.string.isRequired,
    task_id: propsTypes.number
}

ToDoElement.defaultProps = {
    create_date: new Date(),
    description: 'Finalizar task #01',
    status: 'pendente',
    task_id: 50
}


export default ToDoElement