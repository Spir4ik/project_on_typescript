import React, {useState} from 'react'
import SideBar from "./SideBar";
import CardProgress from "./CardProgress";
import {useQuery} from "@apollo/client";
import {gql} from "apollo-boost";
import iconSearch from '../assets/icon-search.svg'

interface client {
    client(client: any): void
}

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

interface ITestTwo {
    processList: ITest[]
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
}
`;


const Progress: React.FC<client> = (props) => {
    const {loading, error, data} = useQuery<ITestTwo>(TEST);
    const [searchCurrentList, setSearchCurrentList] = useState<string>('');

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

    // console.log(outputCurrentList(searchCurrentList));

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
                                   placeholder={'Поиск...'}
                            />
                            <label htmlFor="exampleInputText"><img src={iconSearch} alt=""/></label>
                        </div>
                    </form>
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