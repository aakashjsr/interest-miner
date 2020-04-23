import React from 'react'
import {Link} from 'react-router-dom'

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <a href={`/admin/profile/${r.id}`}>
    <li key={r.id} style={{padding:'10px',width: '19em',background: 'white',listStyleType: 'none'}}>
      {`${r.first_name} ${r.last_name}`}
    </li>
    </a>
  ))
  return <div style={{width: '294px',position: 'relative',top: '4em',right: '23em'}}>
              <ul>{options}</ul>
          </div>
}

export default Suggestions