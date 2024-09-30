import propsTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate} from "react-router-dom"

function SideBar(props){
    const navigate = useNavigate()
    const [handleClick, setHandleClick] = useState(false)
    
    


    const handlingClick = () =>{
        if(handleClick){
            setHandleClick(false)
            
        } else{
            setHandleClick(true)   
            navigate('/manage-users')
        }
    }
 
    return (
        <>
            <div className='h-full'>
                <div className='text-white font-medium text-xl my-6   mr-4 pr-0 flex'>
                    Categorias
                    <select disabled className='h-7 w-4 pl-4  ml-4 bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' > 
                        <option  value={''}>
                            
                        </option>
                    </select>
                </div>
                {props.is_admin ? 
                        <div className='text-white font-medium text-xl my-6 mr-4 pr- flex'>
                            <button onClick={handlingClick}>
                                Usuários
                            </button>
                        
                        </div> : null}
            </div>
        </>
    )
}

SideBar.PropType = {
    is_admin: propsTypes.bool
}

SideBar.defaultProps = {
    is_admin: false
}

export default SideBar