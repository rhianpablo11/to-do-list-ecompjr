import propsTypes from 'prop-types'

function ToDoElement(props){



    return (
        <>
            <div>
                <div>
                    <p>{props.task_id}</p>
                    <p>ToDo ID</p>
                </div>
                <div>
                    <p>{props.create_date}</p>
                    <p>Data da Criação</p>
                </div>
                <div>
                    <p>{props.description}</p>
                    <p>Descrição</p>
                </div>
                <div>
                    <p>Status</p>
                    <p>{props.status}</p>
                </div>
                <div>
                    <button>
                        a
                    </button>
                </div>
                
                
                
                
            </div>
        </>
    )
}

ToDoElement.propTypes = {
    create_date: propsTypes.object.isRequired,
    description: propsTypes.string,
    status: propsTypes.string.isRequired,
    task_id: propsTypes.number
}

ToDoElement.defaultProps = {
    create_date: new Date(),
    description: 'Finalizar task #01',
    status: 'pendente',
    task_id: 50
}


export default ToDoElement