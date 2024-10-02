import NavBarInternal from "../../components/navBarInternal"
import SeeUsersByAdmin from "../../components/seeUsersByAdmin"
import SideBar from "../../components/sideBar"
import propsTypes from 'prop-types'
import { useState, useEffect} from "react"
import { get_token } from "../../utils/utils"

function ManageUsersByAdmin(){
    
    const [infoUser, setInfoUser] = useState({'nome':'Joao', 'email': '', 'is_admin': false})

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
                
                console.log(responseJson)
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

    if(infoUser.is_admin){
        return(
            <>
                <div  className="h-screen">
                    <div>
                        <NavBarInternal  className={'fixed'} name={infoUser.nome} />
                    </div>
                    <div  className="flex h-full">
                        <div  className="w-2/12 h-full p-0 m-0 border-r " >
                            <SideBar  is_admin={true}  />
                        </div>
                        <div  className="flex-row justify-start w-10/12">
                            <SeeUsersByAdmin />
                        </div>
                    </div>
                </div>
            </>
        )
    } else{
        return(
            null
        )
    }
    
}

ManageUsersByAdmin.propTypes = {
    is_admin: propsTypes.bool
}

ManageUsersByAdmin.defaultProps = {
    is_admin: false
}


export default ManageUsersByAdmin