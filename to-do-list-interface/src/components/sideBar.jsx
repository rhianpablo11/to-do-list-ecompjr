import propsTypes from 'prop-types'

function SideBar(props){
    
    
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
                            Usuários
                            <select  className='h-7 w-4 pl-4  ml-4 bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' > 
                                <option  value={'Visualizar'} >
                                    Visualizar
                                </option>
                            </select>
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