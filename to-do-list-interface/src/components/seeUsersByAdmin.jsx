import propsTypes from 'prop-types'
import UserListElement from './UserListElement'
import { useEffect, useState } from 'react'
import CreateAccount from './createAccount'

function SeeUsersByAdmin(props){
    const [showModal, setShowModal] = useState(false)
    const [click, setClick] = useState(false)

    const handlingClick = () =>{
        if(click){
            setClick(false)
            setShowModal(false)
        } else{
            setClick(true)   
            setShowModal(true)
        }
    }


    return(
        <>
            <div className="text-white">
                <div className="flex justify-between mb-3">
                    <h1 className="font-medium ml-6 text-xl mt-4">
                        Usuarios Cadastrados
                    </h1>
                    <button 
                        onClick={handlingClick}
                        className="bg-gray-700 py-2 px-4 rounded-md mt-3"
                    >Adicionar novo</button>
                </div>
                <CreateAccount is_create_by_admin={showModal} is_edit={false} />
                <div className='overflow-y-auto h-96'>
                    <ul>
                        {props.listUsers.map((user, index) =>(
                            <li key={index}>
                                <UserListElement  nome={user.nome}
                                                sobrenome={user.sobrenome}
                                                email={user.email}
                                                telephone={user.telephone}
                                                    />
                            </li>
                        ))}
                    </ul>
                    
                </div>
            </div>
            
            
        </>
    )
}


SeeUsersByAdmin.propTypes = {
    listUsers: propsTypes.array
}

SeeUsersByAdmin.defaultProps = {
    listUsers: []
}


export default SeeUsersByAdmin