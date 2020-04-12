import React from "react";

const Speaker = ({ name }) =>
    <div className="card">
        <div className="card__media"/>
        <div className="card__title">
            <span>{name}</span>
        </div>
    </div>;


export default Speaker;
