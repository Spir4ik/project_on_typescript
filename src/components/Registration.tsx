import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/client/";
import {useHistory} from "react-router-dom";
import eyeInvisible from '../assets/eye-invisible.svg'
import iconConfirm from '../assets/icon-confirmation.svg'
import iconInTheProcess from '../assets/icon-inTheProcess.svg'
import questionCircle from '../assets/question-circle.svg'
import vector from '../assets/Vector.svg'

const registUser = gql`
    mutation ($firstName: String!, $secondName: String!, $email: String!, $password: String!) {
        signup(
        firstName: $firstName, 
        secondName: $secondName, 
        email: $email, 
        password: $password
       )
    }
`;

const Registration: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState<boolean>(false);
    let history = useHistory()

    const [registration] = useMutation(registUser, {
        onCompleted(data) {
            localStorage.setItem('token', data.signup)
        }
    });

    const dataValid = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== passwordTwo) {
            return alert('Пароли не совпадают!')
        }
        try {
            await registration({
                variables: {
                    firstName: firstName,
                    secondName: secondName,
                    email: email,
                    password: password
                }
            });
            window.location.replace(window.location.href + 'process')
        } catch (err) {
            alert(err)
        }
    };

    const testFunc = () => {
        if (password.length >= 8 &&
            password.search(/[A-Z]/g) !== -1 &&
            password.search(/[a-z]/i) !== -1 &&
            password.search(/[0-9]/) !== -1 &&
            password.search(/[!@#$%^&*]/) !== - 1) {
            return(
                <img src={vector} alt=""/>
            )
        }
        return(
            <img src={questionCircle} alt=""/>
        )
    };


    const validPassword = () => {
        if (password.length >= 8 &&
            password.search(/[A-Z]/g) !== -1 &&
            password.search(/[a-z]/i) !== -1 &&
            password.search(/[0-9]/) !== -1 &&
            password.search(/[!@#$%^&*]/) !== - 1) {
            return(
                <div className="window" style={{display: 'none'}}>
                    <div className="pointer">
                    </div>
                    <div className='valid_password'>
                        {password.length < 8 && <p><img src={iconInTheProcess} alt=""/>
                            Содержит 8 символов</p>}
                        {password.length >= 8 && <p><img src={iconConfirm} alt=""/>
                            Содержит 8 символов</p>}

                        {password.search(/[A-Z]/g) === -1 && <p><img src={iconInTheProcess} alt=""/>
                            латинские строчные буквы (A–Z)</p>}
                        {password.search(/[A-Z]/g) !== -1 && <p><img src={iconConfirm} alt=""/>
                            латинские строчные буквы (A–Z)</p>}

                        {password.search(/[a-z]/i) === -1 && <p><img src={iconInTheProcess} alt=""/>
                            латинские строчные буквы (a–z)</p>}
                        {password.search(/[a-z]/i) !== -1 && <p><img src={iconConfirm} alt=""/>
                            латинские строчные буквы (a–z)</p>}

                        {password.search(/[0-9]/) !== -1 && <p><img src={iconConfirm} alt=""/>
                            цифры (0-9)</p>}
                        {password.search(/[0-9]/) === -1 && <p><img src={iconInTheProcess} alt=""/>
                            цифры (0-9)</p>}

                        {password.search(/[!@#$%^&*]/) !== - 1 && <p><img src={iconConfirm} alt=""/>
                            неалфавитные символы (!, $, #, % и т.д.)</p>}
                        {password.search(/[!@#$%^&*]/) === - 1 && <p><img src={iconInTheProcess} alt=""/>
                            неалфавитные символы (!, $, #, % и т.д.)</p>}
                    </div>
                </div>
            )
        }
        return(
            <div className="window" style={{display: 'display'}}>
                <div className="pointer">
                </div>
                <div className='valid_password'>
                    {password.length < 8 && <p><img src={iconInTheProcess} alt=""/>
                        Содержит 8 символов</p>}
                    {password.length >= 8 && <p><img src={iconConfirm} alt=""/>
                        Содержит 8 символов</p>}

                    {password.search(/[A-Z]/g) === -1 && <p><img src={iconInTheProcess} alt=""/>
                        латинские строчные буквы (A–Z)</p>}
                    {password.search(/[A-Z]/g) !== -1 && <p><img src={iconConfirm} alt=""/>
                        латинские строчные буквы (A–Z)</p>}

                    {password.search(/[a-z]/i) === -1 && <p><img src={iconInTheProcess} alt=""/>
                        латинские строчные буквы (a–z)</p>}
                    {password.search(/[a-z]/i) !== -1 && <p><img src={iconConfirm} alt=""/>
                        латинские строчные буквы (a–z)</p>}

                    {password.search(/[0-9]/) !== -1 && <p><img src={iconConfirm} alt=""/>
                        цифры (0-9)</p>}
                    {password.search(/[0-9]/) === -1 && <p><img src={iconInTheProcess} alt=""/>
                        цифры (0-9)</p>}

                    {password.search(/[!@#$%^&*]/) !== - 1 && <p><img src={iconConfirm} alt=""/>
                        неалфавитные символы (!, $, #, % и т.д.)</p>}
                    {password.search(/[!@#$%^&*]/) === - 1 && <p><img src={iconInTheProcess} alt=""/>
                        неалфавитные символы (!, $, #, % и т.д.)</p>}
                </div>
            </div>
        )
    };


    return(
        <div className='bg_color_auth'>
            <p>Project on typescript</p>
            <div className='form_login_window registration'>
                    <div className='header_login_window'>
                        <h5>Регистрация</h5>
                    </div>
                    <form onSubmit={dataValid}>
                        <div className="form-group">
                            <label htmlFor="exampleInputFirstName">Имя</label>
                            <input type="text"
                                   className="form-control"
                                   id="exampleInputFirstName"
                                   onChange={e => setFirstName(e.target.value)}
                                   value={firstName}
                                   placeholder={'Не задано'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputSecondName">Фамилия</label>
                            <input type="text"
                                   className="form-control"
                                   id="exampleInputSecondName"
                                   onChange={e => setSecondName(e.target.value)}
                                   value={secondName}
                                   placeholder={'Не задано'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Почта</label>
                            <input type="email"
                                   className="form-control email-class"
                                   id="exampleInputEmail1"
                                   onChange={e => setEmail(e.target.value)}
                                   value={email}
                                   aria-describedby="emailHelp"
                                   placeholder={'Не задано'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Пароль</label>
                            <input type={showPassword ? 'text' : 'password'}
                                   className="form-control password-class"
                                   id="exampleInputPassword1"
                                   onChange={e => setPassword(e.target.value)}
                                   value={password}
                                   placeholder={'Не задано'}
                            />
                            <p className="password-control">{testFunc()}</p>
                            <p className="password-control first-icon" onClick={() => setShowPassword(!showPassword)}><img src={eyeInvisible} alt=""/> </p>

                            {password && validPassword()}

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword2">Повторите пароль</label>
                            <input type={showPasswordTwo ? 'text' : 'password'}
                                   className="form-control password-class"
                                   id="exampleInputPassword2"
                                   onChange={e => setPasswordTwo(e.target.value)}
                                   value={passwordTwo}
                                   placeholder={'Не задано'}
                            />
                            <p className="password-control" onClick={() => setShowPasswordTwo(!showPasswordTwo)}><img src={eyeInvisible} alt=""/> </p>

                        </div>
                        <div className='footer_window_login'>
                            <button type="submit"
                                    className="btn btn-primary"
                                    disabled={!password || !email ||
                                    !firstName || !secondName ||
                                    !passwordTwo || password.length < 8 ||
                                    password.search(/[A-Z]/g) === -1 ||
                                    password.search(/[a-z]/i) === -1 ||
                                    password.search(/[0-9]/) === -1 ||
                                    password.search(/[!@#$%^&*]/) === - 1}
                            >
                                Применить
                            </button>
                            <span>Уже зарегистрированы?</span>
                            <Link to='/'>
                                <a href="#">Вход</a>
                            </Link>
                        </div>
                    </form>
            </div>
        </div>
    )
};

export default Registration

