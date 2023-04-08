
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Homepage = ({ todos:data}) => {
    const { dark } = useContext(ThemeContext);
    return (
        <div className={` ${dark ? 'bg-[#032539]' : 'bg-white'}`}>
        </div>
    )
}

export default Homepage