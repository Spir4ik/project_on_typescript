import React from 'react'
import {Switch, Route} from "react-router";
import Authorization from './components/Authorization'
import Registration from "./components/Registration";
import Progress from "./components/Progress";


import './styles/index.scss'


const App: React.FC = () => {
    return(
        <>
            <Switch>
                <Route exact path='/' component={Authorization}/>
                <Route path='/registration' component={Registration}/>
                <Route path='/process' component={Progress}/>
            </Switch>
        </>
    )
};

export default App