import React from 'react'
import './defaultLayout.css'
import Header from '../../components/header/header'
import Nav from '../../components/navigation/nav'

interface Props {
    son:JSX.Element
}
const DefaultLayout = (props:Props):JSX.Element => {
  return (
    <div className='defaultLayout'>
        <div className="headerDefaultLayout">
            <Header/>
        </div>
        <div className="sidebarDefaultLayout">
            <Nav/>
        </div>
        <div className="contentDefaultLayout">
            {props.son}
        </div>
    </div>
  )
}

export default DefaultLayout