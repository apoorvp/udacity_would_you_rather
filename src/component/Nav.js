import React from 'react'
import { NavLink } from "react-router-dom";
import UserProfile from './UserProfile';

export default function Nav() {
    return (
        <div>
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink exact to='/' >
                            Home
                    </NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/add' >
                            New Question
                    </NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/leaderboard' >
                            Leader Board
                    </NavLink>
                    </li>
                    <li>
                        <UserProfile />
                    </li>
                </ul>

            </nav>

        </div>
    )
}