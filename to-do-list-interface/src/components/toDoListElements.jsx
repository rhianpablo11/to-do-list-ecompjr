import propsTypes from 'prop-types'


function  ToDoListElement(props){

    return(
        <>
        <div>
            To Do
            <div>
                <ul>
                    {listToDos.map(toDo, index) =>(
                        <li key={index}>
                            <ToDoListElement  create_date={toDo.create_date}
                                              description={toDo.description}
                                              status={toDo.status}
                                                />
                        </li>
                    )}
                </ul>
            </div>
        </div>
        </>
    )
}

ToDoListElement.propType = {
    listToDos: PropTypes.array
}

ToDoListElement.defaultProps = {
    listToDos: []
}


export default ToDoElement