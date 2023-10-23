import React, { useEffect, useState, createContext } from 'react';
import {IAboutApi} from '@database/models/about';
import api from '@database/api';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    actions: "" | "reorder",
    setActions: React.Dispatch<React.SetStateAction<"" | "reorder">>,
    data: IAboutApi[] | [],
    setData: React.Dispatch<React.SetStateAction<IAboutApi[] | []>>,
    onUpdateData: (data: IAboutApi) => void,
    onRemoveData: (data: IAboutApi) => void
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

    const [data, setData] = useState<IAboutApi[] | []>([]);

    const [actions, setActions] = useState<"" | "reorder">("");
  
    useEffect(() => {
      (async () => {
        const response = await api.get("/about");
        setData(response.data.data);
      })()
    }, []);
    
    const onUpdateData = (data: IAboutApi) => {
        setData(state => state.map(el => el._id === data._id ? data : el))
    };
    const onRemoveData = (data: IAboutApi) => {
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