import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { ElMerkadeoApp } from "../ElMerkadeoApp";
import { 
    AlertMessage,
    Layout, 
} from "../ui/components";
import { 
    ActivateAdminPage,
    CartPage,
    CategoryPage,
    ChangeAdminPasswordPage,
    ChangeUserPasswordPage,
    CookiesPage, 
    ItemPage, 
    LoadingPage, 
    LoginAdminPage, 
    LoginUserPage, 
    PrivacyPage, 
    SearchPage, 
    SettingsUserPage, 
    ShopPage,
    TermsPage
} from "../ui/pages";
import { 
    useCategoryData, 
    useProductData, 
    usePromoData, 
    useUserAuth 
} from "../ui/hooks";

export const AppRouter = () => {

    const { pathname } = useLocation();

    const { checkUserAuthToken } = useUserAuth();
    const { getCategories } = useCategoryData();
    const { getProducts } = useProductData();
    const { getPromos } = usePromoData();

    const { 
        isAlertMessage,
        titleMessage,
        textMessage,
    } = useSelector( state => state.alertMessage );
    const { isUserAuth } = useSelector( state => state.userAuth );
    // const { isLoadedUserProds } = useSelector( state => state.productsUser );

    const [isLoadedUserProds, setIsLoadedUserProds] = useState(false)
    setTimeout(() => {
        setIsLoadedUserProds(true);
    }, 1500);

    useEffect(() => {
        isUserAuth && checkUserAuthToken();
        getPromos();
        getProducts();
        getCategories();
    }, []);

    useLayoutEffect(() => {
        window.scrollTo(0,0);
    }, [ pathname ]);


    return (
        !isLoadedUserProds 
            ? 
                <LoadingPage />
            :
                <>
                    <Layout>
                        <Routes>
                            <Route path="/" element={ <ElMerkadeoApp /> } />
                            <Route path="/tienda" element={ <ShopPage /> } />
                            <Route path="/tienda/:category" element={ <CategoryPage /> } />
                            <Route path="/tienda/:category/:item" element={ <ItemPage /> } />
                            <Route path="/buscar" element={ <SearchPage /> } />
                            <Route path="/login" element={ <LoginUserPage /> } />
                            <Route path="/carrito" element={ <CartPage /> } />
                            <Route path="/login-admin" element={ <LoginAdminPage /> } />
                            <Route path="/activar-administrador/:token" element={ <ActivateAdminPage /> } />
                            <Route path="/terminos-y-condiciones" element={ <TermsPage /> } />
                            <Route path="/politica-de-cookies" element={ <CookiesPage /> } />
                            <Route path="/politica-de-privacidad" element={ <PrivacyPage /> } />
                            <Route path="/nuevo-password-administrador/:token" element={ <ChangeAdminPasswordPage /> } />
                            <Route path="/nuevo-password-usuario/:token" element={ <ChangeUserPasswordPage /> } />
                            <Route path="*" element={ <Navigate to="/" /> } />
                            {
                                isUserAuth && <Route path="/configuracion" element={ <SettingsUserPage /> } />
                            }
                        </Routes>
                    </Layout>
                    {
                        isAlertMessage && 
                        <AlertMessage 
                            titleMessage={ titleMessage } 
                            textMessage={ textMessage }
                        />
                    }
                </>
    );
};

