import React, { createContext, useReducer } from 'react';
import appReducer from './AppReducer';

const initialState = {
    employees: [
        {
            id:1,
            name:"Sammy",
            location: "DigitalOcean",
            designation: "Shark"
        }
    ]
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    // useReducer lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.
    const [state, dispatch] = useReducer(appReducer, initialState);

    function addEmployee(employee) {
        dispatch({
            type: "ADD_EMPLOYEE",
            payload: employee
        });
    }

    function editEmployee(employee) {
        dispatch({
            type: "EDIT_EMPLOYEE",
            payload: employee
        });
    }

    function removeEmployee(id) {
        dispatch({
            type: "REMOVE_EMPLOYEE",
            payload: id
        });
    }

    return (
        <GlobalContext.Provider
        value={{
            employees:state.employees,
            addEmployee,
            editEmployee,
            removeEmployee
        }}
        >
            {children}
        </GlobalContext.Provider>
    );
};