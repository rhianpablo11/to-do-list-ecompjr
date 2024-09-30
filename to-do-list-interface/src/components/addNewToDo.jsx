import { useState } from "react"


function AddNewToDo(){
    const [descriptionToDo, setDescriptionToDo] = useState('')

    return (
        <>
        <div className={'text-white w-full h-full flex-row align-top m-2 p-4'}>
            <h3 className="font-semi-bold text-2xl"> 
                Adicionar uma nova ToDo:
            </h3>
            <div className="h-36">
                <textarea className='px-2 ml-3 w-full h-full text-white bg-gray-800 rounded-md text-start align-text-top resize-none overflow-hidden'
                       maxLength={255}
                       placeholder=""
                       value={descriptionToDo}
                       type="text"
                       onChange={()=>setDescriptionToDo(event.target.value)}>

                </textarea>
            </div>
            <div className="h-full">
                <button className="bg-white text-black rounded-md px-5 my-3">
                    Adicionar
                </button>
            </div>
        </div>
        </>
    )
}


export default AddNewToDo