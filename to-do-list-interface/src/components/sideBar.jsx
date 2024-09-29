import propsTypes from 'prop-types'

function SideBar(props){
    return (
        <>
            <div>
                Categorias
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