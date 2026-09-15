import { Navigate, Route, Routes } from "react-router-dom"
import { privateRouter, publicRouter } from "../routes" 
import { observer } from "mobx-react-lite"
import { SHOP_ROUTE } from "../constants/routes"
import { useStore } from "../context"

export const AppRouter = observer( () => {

    const { user } = useStore()
    return (
        <Routes>
            {user.isAuth && privateRouter.map(route => 
                <Route key={route.path} path={route.path} element={route.element} />
            )}
    
            {publicRouter.map(route => 
                <Route key={route.path} path={route.path} element={route.element} />
            )}
        
            <Route path="*" element={ <Navigate to={SHOP_ROUTE} replace /> } />
        
        </Routes>
    )
})


