import propsTypes from 'prop-types'
import { useState } from 'react'

function NavBarInternal(props){
    const [search, setSearch] = useState('')

    return(
        <>
            <div>
                <div>
                    <h1>
                        TD Management
                    </h1>
                    <input placeholder="Pesquisa por ToDo's"
                        value={search}
                        type='text'
                        disabled
                        onChange={()=>setSearch(event.target.value)}>
                    </input>
                </div>
                <div>
                    <p>{props.name}</p>
                    <svg>icon</svg>
                </div>
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

