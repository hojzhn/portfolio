import React from 'react'


function SectionTitleHeader(props) {

    return (

        <div className="section-title">{props.children}</div>

    )
}

function SectionTitleContent(props) {
    return (
        <div className="heading1">{props.children}</div>
    )
}


SectionTitle.T = SectionTitleHeader;
SectionTitle.t = SectionTitleContent;


export default function SectionTitle(props) {
    return (
        <div>{props.children}</div>
    )
}

