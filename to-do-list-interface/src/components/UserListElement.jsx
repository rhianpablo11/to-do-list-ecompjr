import propsTypes from 'prop-types'
import { useEffect, useState } from 'react'
import CreateAccount from './createAccount'

function UserListElement(props){
    const [optionsList, setOptionsList] = useState(['Arquivar', 'Editar'])
    const [optionSelected, setOptionSelected] = useState('')
    const [showModal, setShowModal] = useState(false)

    useEffect(()=>{
        if(optionSelected == 'Editar'){
            setShowModal(true)
            
        } else{
            setShowModal(false)
        }
    },[optionSelected])

    return (
        <>
            <div className='bg-gray-700 rounded-lg flex justify-between p-3 my-1 ml-6' >
                    <div className='w-18'>
                        <p className='font-medium'>#{props.user_id}</p>
                        <p className='font-light'>User ID</p>
                    </div>
                    <div className='w-28'>
                        <p className='font-medium'>{props.nome}</p>
                        <p className='font-light'>Nome</p>
                    </div>
                    <div className='w-28'>
                        <p className='font-medium'>{props.sobrenome}</p>
                        <p className='font-light'>Sobrenome</p>
                    </div>
                    <div className='w-auto'>
                        <p className='font-medium'>{props.email}</p>
                        <p className='font-light'>Email</p>
                    </div>
                    <div className='w-auto'>
                        <p className='font-medium'>{props.telephone}</p>
                        <p className='font-light'>Telefone</p>
                    </div>
                    <div className='w-10'>
                        <select 
                            value={optionSelected} onChange={()=>setOptionSelected(event.target.value)}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' >
                            {optionsList.map((option, index)=>(
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <CreateAccount is_create_by_admin={showModal} is_edit={true} />
                </div>
        </>
    )
}

UserListElement.propTypes = {
    user_id: propsTypes.number,
    email: propsTypes.string,
    nome: propsTypes.string,
    sobrenome: propsTypes.string,
    telephone: propsTypes.string
}

UserListElement.defaultProps = {
    user_id: 25,
    email: 'usuario@gmail.com',
    nome: 'usuario',
    sobrenome: 'sobrenome',
    telephone: '75 98765 - 4321'
}

export default UserListElement