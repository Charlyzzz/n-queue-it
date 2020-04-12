import Emoji from "./Emoji";
import React from "react";

const FABs = ({ onPlus, onMinus }) => {
    return <div className="fab">
        <div className="circle" onClick={onPlus}>
            <Emoji aria="hand" emoji="✋"/>
        </div>
        <div className="circle" onClick={onMinus}>
            <Emoji aria="no-women" emoji="🙅‍♀"/>
        </div>
    </div>;
};

export default FABs;
