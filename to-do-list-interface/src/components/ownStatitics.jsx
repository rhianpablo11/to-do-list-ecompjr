

function OwnStatitiscs(){

    return (
        <>
            <div className="flex-row p-4 m-2 w-full text-white justify-start">
                <h3 className="font-semi-bold text-2xl">Minhas Estatísticas</h3>
                <div className="flex-row justify-items-start align-center justify-start bg-gray-700 p-5 h-36 rounded-lg">
                    <div className="flex justify-start">
                        <h4>ToDo&apos;s Concluídas:</h4>
                    </div>
                    <div className="flex justify-start">
                        <h4>ToDo&apos;s Pendentes:</h4>
                    </div>
                    <div className="flex justify-start">
                        <h4>ToDo&apos;s Arquivadas:</h4>
                    </div>
                    <div className="flex justify-start">
                        <h4>ToDo&apos;s Criadas:</h4>
                    </div>
                    
                </div>
            </div>
        </>
    )
}


export default OwnStatitiscs