import React from 'react'
import {Link,NavLink} from 'react-router-dom'

// const Suggestions = (props) => {
//   console.log('props',props.display)
//   const options = props.results.map(r => (
//     // <a href={`/admin/profile/${r.id}`}>
//     <li key={r.id} style={{padding:'10px',width: '19em',background: 'white',listStyleType: 'none'}} onClick={props.daonClick}>
//       {`${r.first_name} ${r.last_name}`}
//     </li>
//     // </a>
//   ))
//   return <div style={{width: '294px',position: 'relative',top: '4em',right: '23em',display:props.display}}>
//               <ul>{options}</ul>
//           </div>
// }

   
    

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <NavLink to={`/admin/profile/${r.id}`} key={r.id} onClick={props.myClick}>
    <li  style={{padding:'10px',width: '18em',background: 'white',listStyleType: 'none',borderBottom: '3px solid black'}} >
      {`${r.first_name} ${r.last_name}`}
    </li>
    </NavLink>
  ))
  return <div style={{width: '294px',position: 'absolute',top: '4em',right: '13.2em',}}>
              <ul>{options}</ul>
          </div>
}

export default Suggestions