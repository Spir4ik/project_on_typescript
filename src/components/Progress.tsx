import React, {useState} from 'react'
import SideBar from "./SideBar";
import CardProgress from "./CardProgress";
import {useQuery} from "@apollo/client";
import {gql} from "apollo-boost";
import {useHistory} from "react-router";
import iconSearch from '../assets/icon-search.svg'
import iconUser from '../assets/icon-user.svg'
import iconDropDown from '../assets/icon-dropDown.svg'

interface ITest {
    id: string
    name: string
    numberOfExecutions: number
    averageLeadTime: string
    averageActiveTime: string
    employeesInvolvedProcess: number
    numberOfScenarios: number
    start: string
    end: string
    loading: string
}

interface IGetRequestName {
    firstName: string
}

interface ITestTwo {
    processList: ITest[]
    currentUser: IGetRequestName
}

const TEST = gql`
    query {
        processList {
            id
            name
            numberOfExecutions
            averageLeadTime
            averageActiveTime
            employeesInvolvedProcess
            numberOfScenarios
            start
            end
            loading
    }
        currentUser {
            firstName
    }
}
`;

const Progress: React.FC = (props) => {
    const {loading, error, data} = useQuery<ITestTwo>(TEST);
    const [searchCurrentList, setSearchCurrentList] = useState<string>('');
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    let history = useHistory();

    const outputCurrentList = (searchCurrentList: string) => {
        if (searchCurrentList.search(/[A-Z]/g) !== -1 ||
            searchCurrentList.search(/[a-z]/i) !== -1 ||
            searchCurrentList.search(/[!@#$%^&*]/) !== - 1) {
            alert('Недопустимый символ!');
            setSearchCurrentList('')
        }
        if (!data) {
            return null
        }
        return data.processList.filter(item => {
            if (searchCurrentList === '') {
                return item
            }
            if (item.name.substr(20).includes(searchCurrentList)) {
                return item
            }
        })
    };

    const changeHandlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCurrentList(e.target.value);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setShowDropDown(!showDropDown);
    };

    if (error) {return(<p>{error.message}</p>)}
    return(
        <>
        {loading ? (<p>Loading... </p>) :
            (<div className='bg_color_progress'>

                <SideBar />

                <div className='search-by-number'>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group form-in-search-by-number">
                            <input type="text"
                                   className="form-control email-class"
                                   id="exampleInputText"
                                   aria-describedby="emailHelp"
                                   value={searchCurrentList}
                                   onChange={changeHandlerSearch}
                                   placeholder={'Введите номер заявки...'}
                            />
                            <label htmlFor="exampleInputText"><img src={iconSearch} alt=""/></label>
                        </div>
                    </form>

                    <div className="header-user-block">
                        {data && <span><img src={iconUser} alt=""/>{data.currentUser.firstName}</span>}
                        <div className='icon-show-window' onClick={handleClick}>
                            <img src={iconDropDown} alt="" />
                        </div>
                        {showDropDown && <div className="window-exit">

                            <div className="triangle-up"> </div>

                            <span onClick={(e) => {
                                localStorage.removeItem('token');
                                history.push('/');
                                window.location.reload();
                            }
                            }>Выход</span>
                        </div>}
                    </div>
                </div>

                    {data && outputCurrentList(searchCurrentList).map(({name, numberOfExecutions, averageLeadTime,
                        averageActiveTime, employeesInvolvedProcess,
                        numberOfScenarios, start, end, loading, id}) => {
                        return(
                            <CardProgress name={name} numberOfExecutions={numberOfExecutions}
                                          averageLeadTime={averageLeadTime}
                                          averageActiveTime={averageActiveTime}
                                          employeesInvolvedProcess={employeesInvolvedProcess}
                                          numberOfScenarios={numberOfScenarios}
                                          start={start} end={end} loading={loading}
                                          key={id}
                            />
                        )
                    })}
            </div>
            )}
        </>
    )
};

export default Progress