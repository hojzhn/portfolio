import React from 'react';

export default function Flex({ children, style }) {
    return (
        <div className={`contain flex ${style}`}>{children}</div>
    );
}
