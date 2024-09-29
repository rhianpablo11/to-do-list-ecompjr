import { useState } from "react"


function CreateNewToDo(){
    const [description, setDescription] = useState('')

    return(
        <>
        <div>
            Adicionar uma nova ToDo
            <div>
                <p>Descrição:</p>
                <input  value={description}
                        placeholder="Insira a descrição da ToDo"
                        type="text"
                        required
                        onChange={()=>setDescription(event.target.value)}
                        ></input>

                <button>
                    Cancelar
                </button>
                <button>
                    Adicionar
                </button>
            </div>
        </div>
        </>
    )
}



export default CreateNewToDo