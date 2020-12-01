import React from 'react'
import {Switch, Route} from "react-router";
import Authorization from './components/Authorization'
import Registration from "./components/Registration";
import Progress from "./components/Progress";
import EditUser from "./components/EditUser";
import PrivateRoute from './components/PrivateRoute'


import './styles/index.scss'

const auth = () => {
    if (localStorage.getItem('token')) {
        return true
    }
    return false
};


const App: React.FC = () => {
    return(
        <>
            <Switch>
                <Route exact path='/' component={Authorization}/>
                <Route path='/registration' component={Registration}/>
                <Route path='/edituser' component={EditUser} />
                <PrivateRoute auth={auth} path='/process' component={() => (<Progress />)}/>
            </Switch>
        </>
    )
};

export default App