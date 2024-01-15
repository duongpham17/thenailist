import React, { useEffect, useState, createContext } from 'react';
import { IClientApi } from '@database/models/client';
import api from '@database/api';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    data: IClientApi[] | [],
    setData: React.Dispatch<React.SetStateAction<IClientApi[] | []>>,
    onRemoveData: (data: IClientApi) => void
};

// for consuming in children components, initial return state
export const Context = createContext<PropsContextTypes>({
    data: [],
    setData: (value) => "",
    onRemoveData: (data) => ""
});

export const useTemplateContext = ({children}: Props) => {

    const [data, setData] = useState<IClientApi[] | []>([]);
  
    useEffect(() => {
      (async () => {
        const response = await api.get("/client");
        setData(response.data.data);
      })()
    }, []);

    const onRemoveData = (data: IClientApi) => {
        setData(state => state.filter(el => el._id !== data._id))
    };
  
    const value = {
        data,
        setData,
        onRemoveData
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default useTemplateContext