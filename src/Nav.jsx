import React, { Component } from 'react';

class Nav extends Component {

    render() {
        console.log("Rendering <Nav/>");
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <span className="navbar-clientsOn">{this.props.numberClients} users online</span>
            </nav>
        );
    }
}
export default Nav;