import React from "react";
import Speaker from "./Speaker";
import Rest from "./Rest";

const QueuedSpeaker = ({ name, queue, index }) => {
    return (
        <>
            {
                index !== 5 ? <Speaker name={name}/> : <Rest name={name} queue={queue}/>
            }
        </>
    );
};


export default QueuedSpeaker;
