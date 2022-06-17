import React from 'react';
import HeaderPopup from "./header/PopupMsgHeadr";
import HeaderPrimary from '../components/header/headerPrimary';

function Header() {
    return (
        <div>
        {/* <HeaderPopup /> {/*Limited Offer PopUP on top} */}
        <HeaderPrimary /> {/* // Primary Header  */}
        </div>
    );
}

export default Header;