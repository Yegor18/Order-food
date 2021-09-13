import React from 'react';
import RestoServiceContext from '../resto-service-context';

const WithRestoService = () => (Wrapped) => {
    return (props) => {
        return (
            <RestoServiceContext.Consumer>
                {
                    (Restoreservice) => {
                        return <Wrapped {...props} Restoreservice={Restoreservice}/>
                    }
                }
            </RestoServiceContext.Consumer>
        )
    }
};

export default WithRestoService;