import React, {useState} from 'react'
import SideBar from "./SideBar";
import {useQuery, useMutation} from "@apollo/client";
import {gql} from "apollo-boost";

const currentU = gql`
   query {
        currentUser {
            id
            firstName
            secondName
            email
  }
}
`;

interface ICurrentU {
    id: number
    firstName: string
    secondName: string
    email: string
}

interface GetICurrentU {
    currentUser: ICurrentU
}

const editUser = gql`
    mutation editUserMutation($id: Int!, $email: String!, $firstName: String!, $secondName: String!, $password: String) {
        editUser(id: $id, 
            email: $email, 
            firstName: $firstName, 
            secondName: $secondName, 
            password: $password) {
                firstName
                secondName
                email
            }
    }
`;

const EditUser: React.FC = () => {
    const {loading, error, data} = useQuery<GetICurrentU>(currentU, {
        onCompleted(data) {
            setName(data.currentUser.firstName);
            setSecondName(data.currentUser.secondName);
            setEmail(data.currentUser.email);
            setUserId(data.currentUser.id);
        }
    });

    const [name, setName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordTwo, setPasswordTwo] = useState<string>('');
    const [userId, setUserId] = useState<number>(null);

    const [edit] = useMutation(editUser);

    // const handelSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault();
    //     try {
    //         await edit ({
    //             variables: {
    //                 id: userId,
    //                 email: email,
    //                 firstName: name,
    //                 secondName: secondName,
    //                 // password: password
    //             }
    //         });
    //         window.location.reload()
    //     } catch (e) {
    //         console.error(e)
    //     }
    // };

    const renderBtn = () => {
        if (password) {
            return(
                <button type="submit"
                        className="btn btn-primary"
                        disabled={!password ||
                        !passwordTwo || password.length < 8}
                        onClick={async (event) => {
                            event.preventDefault();

                            if (password !== passwordTwo) {
                                return alert('Пароли не совпадают!')
                            }

                            await edit ({
                                variables: {
                                    id: userId,
                                    email: email,
                                    firstName: name,
                                    secondName: secondName,
                                    password: password
                                }
                            });
                            window.location.replace('http://localhost:3030/#/');
                            window.location.reload();
                        }}
                >
                    Сохранить
                </button>)
        }
        return(
            <button type="submit"
                    className="btn btn-primary"
                    onClick={async e => {
                        e.preventDefault();
                        await edit ({
                            variables: {
                                id: userId,
                                email: email,
                                firstName: name,
                                secondName: secondName,
                            }
                        });
                        window.location.reload();
                    }}
            >
                Сохранить
            </button>
        )
    }

    return(
        <div className='bg_color_progress'>
            <SideBar />
            <div className='search-by-number page-editUser'>
                {data && <h4>{data.currentUser.firstName} {data.currentUser.secondName}. Редактирование</h4>}
            </div>

            <div className="edit_account_block">
                <form>
                    {renderBtn()}
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput1">Имя</label>
                        <input type="text"
                               className="form-control"
                               id="formGroupExampleInput1"
                               onChange={(e) => setName(e.target.value)}
                               value={name}
                               placeholder="Не задано"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Фамилия</label>
                        <input type="text"
                               className="form-control"
                               id="formGroupExampleInput2"
                               onChange={(e) => setSecondName(e.target.value)}
                               value={secondName}
                               placeholder="Не задано"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Электронная почта</label>
                        <input type="email"
                               className="form-control email-class"
                               id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               onChange={(e) => setEmail(e.target.value)}
                               value={email}
                               placeholder={'Не задано'}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Новый пароль</label>
                        <input type='password'
                               className="form-control password-class"
                               id="exampleInputPassword1"
                               onChange={(e) => setPassword(e.target.value)}
                               value={password}
                               placeholder={'Не задано'}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword2">Повторите пароль</label>
                        <input type='password'
                               className="form-control password-class"
                               id="exampleInputPassword2"
                               onChange={(e) => setPasswordTwo(e.target.value)}
                               value={passwordTwo}
                               placeholder={'Не задано'}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
};

export default EditUser