import { useState, useEffect} from "react"
import AddNewToDo from "../../components/addNewToDo"
import NavBarInternal from "../../components/navBarInternal"
import OwnStatitiscs from "../../components/ownStatitics"
import SideBar from "../../components/sideBar"
import ToDoListElement from "../../components/toDoListElements"
import { save_cookie_token, get_token } from '../../utils/utils'

function LoggedIndexPage(){
    const [toDoList, setToDoList] = useState([])
    const [infoUser, setInfoUser] = useState({'nome':'Joao', 'email': ''})

    const getDataUser = async () => {
        try{
            const urlCommunicate = 'http://localhost:8000'+'/user/get-full-data'
            const response = await fetch(urlCommunicate, {
                method: 'GET',
                headers: {
                    'Authorization': `${get_token()}`
                }
            })
            
            
            if(response.ok){
                const responseJson = await response.json()
                setToDoList(responseJson['to_do'])
                console.log(toDoList)
                setInfoUser(responseJson['user_infos'])
                save_cookie_token(responseJson['token'])
            }
        } catch(e){

        }   
    }
    

    useEffect(()=>{
       
        getDataUser()
        
        const interval = setInterval(getDataUser, 2000)
        return () => clearInterval(interval)
    },[])
    


    return(
        <>
            <div className="h-screen">
                <div>
                    <NavBarInternal className={'fixed'} name={infoUser.nome} />
                </div>
                <div className="flex h-full">
                    <div className="w-2/12 h-full p-0 m-0 border-r " >
                        <SideBar is_admin={infoUser.is_admin} />
                    </div>
                    <div className="flex-row justify-start w-10/12">
                        <div className="flex h-30">
                            <AddNewToDo email={infoUser.email}/>
                            <OwnStatitiscs />
                        </div>
                        <div className="flex-row my-5 justify-start">
                            <ToDoListElement listToDos={toDoList} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoggedIndexPage