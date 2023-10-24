import React, { useEffect, useState, createContext } from 'react';
import {IServices} from '@database/models/services';
import api from '@database/api';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    services: IServices[],
};

// for consuming in children components, initial return state
export const Context = createContext<PropsContextTypes>({
    services: []
});

export const useAuthentication = ({children}: Props) => {

    const [services, setServices] = useState<IServices[] | []>([])

    useEffect(() => {

        (async () => {
            try{
                const response = await api.get("/services");
                setServices(response.data.data);
            } catch(err: any){
                console.log(err.response)
            }
        })();
        
    }, []);


    const value = {
        services
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default useAuthentication