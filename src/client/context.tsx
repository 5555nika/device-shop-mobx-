import  { createContext, useContext, type ReactNode } from "react";
import { UserStore } from "./store/UserStore";
import { DeviceStore } from "./store/DeviceStore";

const stores = {
    user: new UserStore(),
    device: new DeviceStore()
}

export const StoreContext = createContext(stores)
    
export const StoreProvider = ({children}: {children: ReactNode }) => {
    return (
        <StoreContext.Provider value={stores}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
    throw new Error('useStore должно быть использовано внутри StoreProvider');
    }
    return context;
    // const { user, device } = useStore();
}

