import './header.css'

/**
 * Header for the application
 * @returns {null}
 */

const Header = () => {

    return (
        <div>
            <nav className="navbar theme navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Admin UI</a>
                </div>
            </nav>
        </div>
    )

}


export default Header