import React, { useEffect, useState } from 'react'
import AddPost from '../include/AddPost'
import FrentList from '../include/FrentList'
import MainPost from '../include/MainPost'
import { auth, db } from '../services/firebase'
import ChatForm from './ChatForm'
import Header from './Header'

export default function Home() {
    const [user, setUser] = useState([])
  
    return (
        <div>
            <Header/>
            
            <FrentList/>
            <ChatForm/>
            <AddPost/>
            <MainPost/>
        </div>
    )
}
