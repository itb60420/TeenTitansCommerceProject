import React from 'react'



const Details = (props) => {
    const {revId,name,cubicle,date,time} = props.rev
    const{handleCancelClick}= props.handleCancelClick
    return (
    <tr>
            <td>{revId}</td>
            <td>{name}</td>
            <td>{cubicle}</td>
            <td>{date}</td>
            <td> {time}</td>
    
    <button type = "button" onClick={()=>handleCancelClick(revId)}>
        Cancel</button>
    </tr>
    )
}

export default Details


