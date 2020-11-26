import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/client/";


const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// interface cli {
//     client: any
// }

const Authorization: React.FC<{client: any}>= (props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [login] = useMutation(LOGIN_MUTATION, {
        onCompleted(data:any) {
            localStorage.setItem('token', data.login.token);
        }
    });

    useEffect(() => {
        if (window.location.href === 'http://localhost:3030/#/') {
             localStorage.removeItem('token');
            console.log(localStorage.getItem('token'))
        }
        // localStorage.removeItem('token')
        // console.log(localStorage.getItem('token'))
    });


    const changeHandlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    const changeHandlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

    const handlerSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login({
                variables: {
                    email: email,
                    password: password
                }
            })
            window.location.replace('http://localhost:3030/#/process')
        } catch (e) {
            console.error(e)
        }
    };

    console.log(props.client);

    return(
        <div className='bg_color_auth'>
            <p>Project on typescript</p>
            <div className='form_login_window'>
                <div className='header_login_window'>
                    <h5>Вход</h5>
                </div>
                <form onSubmit={handlerSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Почта</label>
                        <input type="email"
                               className="form-control email-class"
                               id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               onChange={changeHandlerEmail}
                               value={email}
                               placeholder={'Введите почту'}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Пароль</label>
                        <input type="password"
                               className="form-control password-class"
                               id="exampleInputPassword1"
                               value={password}
                               onChange={changeHandlerPassword}
                               placeholder={'Введите пароль'}
                        />
                    </div>
                    <button type="submit"
                            className="btn btn-primary">Войти
                    </button>
                    <Link to='/registration'>
                        <a href="#">Зарегистрироваться</a>
                    </Link>
                </form>
            </div>
        </div>
    )
};

export default Authorization