import React from 'react';
import '../componentsCSS/Header.css';

export default function Header(props) {
    return(
        <header className="Header">
            <form className="login">
                <label>username: </label>
                <input id="name" onChange={() => props.logOut(false)}></input>
                <label>password: </label>
                <input id="pwd" type="password"></input>
            </form>
            <button type="submit" className="loginButton" onClick={() => props.handleLogin(document.getElementById("name").value,document.getElementById("pwd").value)}>login</button>
            <div className="HeaderText">
            Todo List By TonyM
            </div>
        </header>
    )
}