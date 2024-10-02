import propsTypes from 'prop-types'
import UserListElement from './UserListElement'
import { useEffect, useState } from 'react'
import CreateAccount from './createAccount'
import { get_token } from '../utils/utils'

function SeeUsersByAdmin(props){
    const [showModal, setShowModal] = useState(false)
    const [click, setClick] = useState(false)
    const [usersList, setUsersList] = useState([])

    const handlingClick = () =>{
        if(click){
            setClick(false)
            setShowModal(false)
        } else{
            setClick(true)   
            setShowModal(true)
        }
    }

    const getUserList = async () => {
        try{
            const urlCommunicate = 'http://localhost:8000'+'/user/manage-users'
            const response = await fetch(urlCommunicate, {
                method: 'GET',
                headers: {
                    'Authorization': `${get_token()}`
                }
            })

            if(response.ok){
                const responseJson = await response.json()
                setUsersList(responseJson)
            }
        } catch(e){}   
    }

    useEffect(()=>{
        getUserList
        const interval = setInterval(getUserList, 2000)
        return () => clearInterval(interval)
    }, [])
    

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
                        {usersList.map((user, index) =>(
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