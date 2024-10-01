import propsTypes from 'prop-types'
import ToDoElement from './toDoElement'


function  ToDoListElement(props){

    return(
        <>
        <div className='text-white flex-row  justify-start'>
            <h2 className='font-bold ml-8 flex text-2xl'>To Do:</h2>
            <div className='overflow-y-auto h-96'>
                <ul>
                    {props.listToDos.slice().reverse().map((toDo, index) =>(
                        <li key={index}>
                            <ToDoElement  create_date={toDo.create_date}
                                              description={toDo.description}
                                              status={toDo.status}
                                              task_id={toDo.task_id}
                                                />
                        </li>
                    ))}
                </ul>
                
            </div>
        </div>
        </>
    )
}

ToDoListElement.propType = {
    listToDos: propsTypes.array
}

ToDoListElement.defaultProps = {
    listToDos: []
}


export default ToDoListElement