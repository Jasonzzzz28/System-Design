import './Header.css';

const Header = () => {
    return (
        <header className="header slide-down">
            <div className="container">
                <div className="header-content">
                    <h1 className="header-title">
                        <span className="gradient-text">System Design</span> Notes
                    </h1>
                    <p className="header-subtitle">
                        My solutions for system design problems
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
