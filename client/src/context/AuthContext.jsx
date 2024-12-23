
import {createContext} from 'react';


const AuthContext = createContext();


// Para guarda la data de los usuarios

const AuthhProvider = ({children})=>{
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}