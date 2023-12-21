import './Header.scss';

const Header = () => {
    return (
        <nav className='header'>
            <div className='container'>
                <div className='header__content'>
                    <div className='header__left-content'>
                        <img
                            src='/images/logo.png'
                            alt='Siemens energy'
                        />
                    </div>
                    <div className='header__right-content'>
                        <img
                            src='/images/user.jpg'
                            alt='user image'
                        />
                        <p className='header__username'>{'Alexander Hipp'}</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;