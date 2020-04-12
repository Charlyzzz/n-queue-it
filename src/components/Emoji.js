import React from "react";

const Emoji = ({ aria, emoji }) =>
    <span role="img" className="emoji" aria-label={aria}>{emoji}</span>;


export default Emoji;
