import propsTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { remove_token } from '../utils/utils'

function NavBarInternal(props){
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const logoutOperation = () =>{
        remove_token()
        navigate('/')
    }


    return(
        <>
            <div className='border-b-2 border-solid border-gray-400 w-full flex h-10 items-center text-white max-w-[1240px] mx-auto px-4 justify-between'>
                    <button onClick={()=>{navigate('/dashboard')}}>
                        <h1 className='font-bold text-2xl'>
                            TD Management
                        </h1>
                    </button>
                    
                    <ul className='flex items-center'>
                        <li>
                            <input className= 'px-2 ml-3 text-gray-700 bg-gray rounded-md' 
                            placeholder="Pesquisa por ToDo's"
                            value={search}
                            type='text'
                            disabled
                            onChange={()=>setSearch(event.target.value)}>
                            </input>
                        </li>
                        <li className='p-6'>
                            <h4>{props.name}</h4>
                        </li>
                        <li className='p-1'>
                            <button onClick={logoutOperation}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            </button>
                            
                        </li>
                        
                    </ul>

            </div>
        </>
    )
}

NavBarInternal.propTypes = {
    is_admin: propsTypes.bool,
    name: propsTypes.string
}

NavBarInternal.defaultProps = {
    is_admin: false,
    name: 'João Almeida'
}

export default NavBarInternal

