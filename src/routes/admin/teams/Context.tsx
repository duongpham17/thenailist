import React, { useEffect, useState, createContext } from 'react';
import {ITeamsApi} from '@database/models/teams';
import api from '@database/api';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    actions: "" | "reorder",
    setActions: React.Dispatch<React.SetStateAction<"" | "reorder">>,
    data: ITeamsApi[] | [],
    setData: React.Dispatch<React.SetStateAction<ITeamsApi[] | []>>,
    onUpdateData: (data: ITeamsApi) => void,
    onRemoveData: (data: ITeamsApi) => void
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

    const [data, setData] = useState<ITeamsApi[] | []>([]);

    const [actions, setActions] = useState<"" | "reorder">("");
  
    useEffect(() => {
      (async () => {
        const response = await api.get("/teams");
        setData(response.data.data);
      })()
    }, []);
    
    const onUpdateData = (data: ITeamsApi) => {
        setData(state => state.map(el => el._id === data._id ? data : el))
    };
    const onRemoveData = (data: ITeamsApi) => {
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