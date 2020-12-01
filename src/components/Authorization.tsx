import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/client/";
import {useHistory} from "react-router-dom";


const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Authorization: React.FC= (props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [login] = useMutation(LOGIN_MUTATION, {
        onCompleted(data:any) {
            localStorage.setItem('token', data.login.token);
        }
    });
    let history = useHistory();


    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/process');
        }
        addEventListener("popstate",function(e){
            window.location.reload()
        });
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
            });
            window.location.replace(window.location.href + 'process')
        } catch (e) {
            alert(e)
        }
    };
    console.log(history);
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