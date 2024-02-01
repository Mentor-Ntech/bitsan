import React, { useContext } from 'react'
import Identicon from 'react-identicons';
import { userCOntext } from '../context/context';

function IdenticonImg({address}) {
    const {user} = useContext(userCOntext)
    return (<Identicon string={user?.user?.address} size={100} />)
}

export default IdenticonImg