import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
    activateAdminSection,
    activateAdminButton,
} from './styles/ActivateAdminPage.module.css';
import { useAdminAuth } from '../hooks';

export const ActivateAdminPage = () => {

    const [isActivated, setIsActivated] = useState(false);

    const { token } = useParams();
    const { startActivateAdmin } = useAdminAuth();

    useEffect(() => {
        const activateAdmin = async() => {
            const res = await startActivateAdmin( token );
            setIsActivated( res );
        }
        activateAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
        <section className={`imageHeroeContainer ${ activateAdminSection }`}>
            <Link
                to={ isActivated ? '/login-admin' : '/' }
                className={ activateAdminButton }
            >
                { isActivated ? 'INICIA SESIÓN' : 'IR AL INICIO' }
            </Link>

        </section>
    );
};
