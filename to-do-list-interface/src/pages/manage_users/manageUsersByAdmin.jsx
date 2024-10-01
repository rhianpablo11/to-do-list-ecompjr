import NavBarInternal from "../../components/navBarInternal"
import SeeUsersByAdmin from "../../components/seeUsersByAdmin"
import SideBar from "../../components/sideBar"
import propsTypes from 'prop-types'
import { useState, useEffect} from "react"
import { get_token } from "../../utils/utils"

function ManageUsersByAdmin(props){
    const [infoUser, setInfoUser] = useState({'nome':'Joao'})

    

    if(props.is_admin ){
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