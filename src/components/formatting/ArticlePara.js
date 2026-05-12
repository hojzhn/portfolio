import React from 'react'

function ParaHeader(props) {
    return (
        <b>{props.children}</b>
    )
}


function ParaContent(props) {

    return (
        <p>
            {props.children}
        </p>
    )

}



function Para(props) {
    return (
        <div className="article-para">{props.children}</div>
    )
}

Para.T = ParaHeader;
Para.t = ParaContent;

export default Para