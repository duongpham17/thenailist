import React, { useEffect, useState, createContext } from 'react';
import { ICareersApi } from '@database/models/careers';
import api from '@database/api';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    actions: "" | "create" | "reorder",
    setActions: React.Dispatch<React.SetStateAction<"" | "create" | "reorder">>,
    data: ICareersApi[] | [],
    setData: React.Dispatch<React.SetStateAction<ICareersApi[] | []>>,
    onUpdateData: (data: ICareersApi) => void,
    onRemoveData: (data: ICareersApi) => void
};

// for consuming in children components, initial return state
export const Context = createContext<PropsContextTypes>({
    actions: "",
    setActions: (value) => "",
    data: [],
    setData: (value) => "",
    onUpdateData: (data) => "",
    onRemoveData: (data) => ""
});

export const useTemplateContext = ({children}: Props) => {

    const [data, setData] = useState<ICareersApi[] | []>([]);

    const [actions, setActions] = useState<"" | "create" | "reorder">("");
  
    useEffect(() => {
      (async () => {
        const response = await api.get("/careers");
        setData(response.data.data);
      })()
    }, []);

    const onUpdateData = (data: ICareersApi) => {
        setData(state => state.map(el => el._id === data._id ? data : el))
    };
    const onRemoveData = (data: ICareersApi) => {
        setData(state => state.filter(el => el._id !== data._id))
    };
  
    const value = {
        data,
        setData,
        actions,
        setActions,
        onUpdateData,
        onRemoveData
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default useTemplateContext