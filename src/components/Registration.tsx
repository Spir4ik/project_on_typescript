import React from 'react'
import {Link} from "react-router-dom";


const Registration: React.FC = () => {

    return(
        <div className='bg_color_auth'>
            <p>Project on typescript</p>
            <div className='form_login_window registration'>
                    <div className='header_login_window'>
                        <h5>Регистрация</h5>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputFirstName">Имя</label>
                            <input type="text"
                                   className="form-control"
                                   id="exampleInputFirstName"
                                   placeholder={'Не задано'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputSecondName">Фамилия</label>
                            <input type="text"
                                   className="form-control"
                                   id="exampleInputSecondName"
                                   placeholder={'Не задано'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Почта</label>
                            <input type="email"
                                   className="form-control email-class"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   placeholder={'Не задано'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Пароль</label>
                            <input type="password"
                                   className="form-control password-class"
                                   id="exampleInputPassword1"
                                   placeholder={'Не задано'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword2">Повторите пароль</label>
                            <input type='password'
                                   className="form-control password-class"
                                   id="exampleInputPassword2"
                                   placeholder={'Не задано'}
                            />
                        </div>
                        <button type="submit"
                                className="btn btn-primary">Применить
                        </button>
                        <div className='footer_window_login'>
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

