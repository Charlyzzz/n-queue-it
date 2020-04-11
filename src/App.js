import React, {useState} from 'react';
import {getCurrentClassroomState, sendAddParticipantRequest, sendRemoveParticipantRequest} from "./api";

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

const Emoji = ({ aria, emoji }) =>
    <span role="img" className="emoji" aria-label={aria}>{emoji}</span>;


const Speaker = ({ name }) =>
    <div className="card">
        <div className="card__media"/>
        <div className="card__title">
            <span>{name}</span>
        </div>
    </div>;

const randomName = Math.random().toString(36).substr(2);

const Rest = ({ queue }) => {
    const [ref, setCardRef] = useState(null);
    return (
        <div className="card" ref={setCardRef}>
            <div className="card__media blured"/>
            <div className="card__title blured">
                <span> {randomName} </span>
            </div>
            {
                ref ?
                    <Overlay cardRef={ref} queue={queue}/>
                    : null
            }
        </div>
    );
};

const Overlay = ({ cardRef, queue }) => {
    const { height } = cardRef.getBoundingClientRect();
    const margin = parseInt(window.getComputedStyle(cardRef)['margin'].replace('px', ''));
    console.log(margin);
    const corrected = (axis) => ((axis - margin) / 2);
    const centeredHorizontallyAndVertically = {
        marginTop: corrected(height),
        marginLeft: 'auto'

    };
    return (
        <div className="card__overlay" style={centeredHorizontallyAndVertically}>
            +{queue.length}
        </div>
    );
};
const QueuedSpeaker = ({ name, queue, index }) => {
    const moreThan6Speakers = queue.length > 0;
    return (
        <>
            {
                moreThan6Speakers && index === 5 ?
                    <Rest queue={queue}/> :
                    <Speaker name={name}/>
            }
        </>
    );
};

const ws = new WebSocket("ws://localhost:8080/aula/iasc/eventos");
const App = () => {
    const participantName = 'Ernesto';

    const [queue, setQueue] = useState([]);
    const [currentVersion, setCurrentVersion] = useState(0);

    const updateStateWithCurrentSnapshot = () => {
        return getCurrentClassroomState().then(currentState =>
            Promise.all([
                setCurrentVersion(currentState.version),
                setQueue(currentState.aula.interesados.map(interesado => ({name: interesado.nombre}))),
            ]));
    };

    if(queue.length === 0 && currentVersion === 0) {
        updateStateWithCurrentSnapshot();
    }

    const addToQueue = participantName => setQueue([...queue, {name: participantName}]);
    const removeFromQueue = participantName => {
        setQueue(queue.filter(participant => participant.name !== participantName));
    };

    const mainSpeaker = queue.slice(0, 1);
    const upNextSpeakers = queue.slice(1, 4);
    const firstSixQueuedSpeakers = queue.slice(4, 10);
    const restOfQueuedSpeakers = queue.slice(10);

    ws.onmessage = (wsEvent) => {
        const parsedWSEvent = JSON.parse(wsEvent.data);
        const event = parsedWSEvent.evento;
        const version = parsedWSEvent.version;
        const isOutOfSyncWithServer = version > (currentVersion+1);
        if (isOutOfSyncWithServer) {
            return updateStateWithCurrentSnapshot();
        }
        console.log("Received message:" + JSON.stringify(event));
        switch (event.type) {
            case 'QuiereHablar': {
                addToQueue(event.alumno.nombre);
                break;
            }
            case 'YaNoQuiereHablar': {
                removeFromQueue(event.alumno.nombre);
                break;
            }
            default: break;
        }
        setCurrentVersion(version);
    };

    return (
        <div className="app">
            <div className="side-a">
                <div className="header-background"/>
                <div className="header headline-centered">
                    N-Q-it!
                </div>
                <div className="main-speaker-title headline-centered">
                    Main
                </div>
                <div className="main-speaker-container">
                    {
                        mainSpeaker.map(({ name }) =>
                            <Speaker key={0} name={name}/>
                        )
                    }
                </div>

                <div className="up-next-title headline-centered ">
                    Up next
                </div>

                <div className="up-next-container">
                    {
                        upNextSpeakers.map(({ name }, index) =>
                            <Speaker key={index} name={name}/>
                        )
                    }
                </div>

                <div className="queued-title headline-centered">
                    Queued
                </div>
                <div className="queued-container">
                    {
                        firstSixQueuedSpeakers.map(({ name }, index) =>
                            <QueuedSpeaker
                                key={index}
                                name={name}
                                index={index}
                                queue={restOfQueuedSpeakers}
                            />
                        )
                    }
                </div>
            </div>
            <FABs
                onPlus={() => sendAddParticipantRequest(participantName)}
                onMinus={() => sendRemoveParticipantRequest(participantName)}
            />
        </div>

    );
};

export default App;
