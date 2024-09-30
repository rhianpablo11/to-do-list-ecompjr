import styles from "./landingPage.module.css"
import gifToDO from '../../assets/todo-webp.gif'
import {  useState } from 'react'
import { useNavigate} from "react-router-dom"
import CreateAccount from "../../components/createAccount"

function LadingPageToDo(){
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalLogin, setShowModalLogin] = useState(false)
    const [click, setClick] = useState(false)
    const navigate = useNavigate()

    const handlingClick = (event) =>{
        if(click){
            setClick(false)
            setShowModalCreate(false)
        } else{
            setClick(true)   
            if(event.target.innerHTML == 'Criar Conta'){
                setShowModalCreate(true)
            }else{
                navigate('/login')
            }
            
        }
    }


    return(
        <>
            <div className={styles.landingPageComponent}>
                <CreateAccount is_create_by_admin={showModalCreate} is_edit={false} />
                <div className={styles.navBarBackground}>
                    <div className={styles.navBarLandingPage}>
                        <div className={styles.logoArea} >
                            <h1 >
                                TD Management
                            </h1>
                        </div>
                        <div className={styles.buttonLadingPage}>
                            <button onClick={handlingClick}>
                                Criar Conta
                            </button>
                            <button  onClick={handlingClick}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.principalArea}>
                    <div className={styles.textPrincipalArea}>
                        <div className={styles.glassOfTextArea}>
                            <div className={styles.glassOfTextAreaComplement}>
                                <h1 className={styles.submainSentence}>
                                    O seu gerenciador de
                                </h1>
                                <h1 className={styles.mainSentence}>
                                    ToDo's
                                </h1>
                                <h3 className={styles.subtitle}>
                                    Para uma melhor organização das suas tarefas
                                </h3>
                                <h6 className={styles.infoAboutConsortium}>
                                    Versão do projeto 0.1.3
                                </h6>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className={styles.gifArea}>
                        <img src={gifToDO}></img>
                    </div>
                </div>
            </div>
        </>
    )
}


export default LadingPageToDo