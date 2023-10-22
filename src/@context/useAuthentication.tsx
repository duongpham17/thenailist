import React, { useEffect, useState, createContext } from 'react';
import {useRouter} from 'next/router';
import {IUsers} from '@database/models/users';
import api from '@database/api';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    user: IUsers | null,
};

// for consuming in children components, initial return state
export const Context = createContext<PropsContextTypes>({
    user: null
});

export const useAuthentication = ({children}: Props) => {

    const router = useRouter();

    const [user, setUser] = useState<IUsers | null>(null);

    useEffect(() => {
        const storage = typeof window === "undefined" ? "" :  localStorage.getItem("user");
        const user = storage ? JSON.parse(storage) : null;
        if(!user) return;
        
        (async () => {
            try{
                const response = await api.get("/api/authentication/persist");
                if(!response) return;
                setUser(response.data.data);
            } catch(err: any){
                console.log(err.response)
            }
        })();
        
    }, []);


    // User must be logged in to gain access to these routes
    useEffect(() => {

        const pathname = router.pathname.replace("/", "").toLowerCase();

        // const allowedRoutes = {
        //     public: ["", "login", "confirm", "prices"],
        //     user: [""],
        // };
          
        // if(user?.role === "user"){
        //     if(pathname.includes("admin")){
        //         router.push("/404")
        //     } else if(allowedRoutes.user.includes(pathname) || allowedRoutes.public.includes(pathname)) {
        //         return;
        //     } else if(pathname.includes("404")) {
        //         return;
        //     } else {
        //         router.push("/404")
        //     }
        // }

        // if(!user){
        //     if (allowedRoutes.public.includes(pathname)) {
        //         return;
        //     } else if(pathname.includes("404")) {
        //         return;
        //     } else {
        //         return;
        //     }
        // }

    }, [router]);

    const value = {
        user
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default useAuthentication