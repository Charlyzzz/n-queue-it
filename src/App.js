import React, { useState } from 'react';

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
            <div className="card blured">
                <div className="card__media"/>
                <div className="card__title">
                    <span> {randomName} </span>
                </div>
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
    const corrected = (axis) => ((axis - margin) / 2);
    const centeredHorizontallyAndVertically = { marginTop: corrected(height) };
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

const App = () => {
    const participants = [
        { name: 'Hernan Rogelio Arias ApellidoLargo MuyMuyLargo MuyMuyMuyLargo' },
        { name: 'Erwin' },
        { name: 'Nico' },
        { name: 'Hernan Rogelio Arias ApellidoLargo MuyMuyLargo MuyMuyMuyLargo' },
        { name: 'Ernesto' },
        { name: 'Agustin' },
        { name: 'Fernando' },
        { name: 'Hernan Rogelio Arias ApellidoLargo MuyMuyLargo MuyMuyMuyLargo' },
        { name: 'Fabian' },
        { name: 'Virginia' },
        { name: 'Marcelo' },
        { name: 'Horacio' },
        { name: 'Alberto' },
        { name: 'Hernan Rogelio Arias ApellidoLargo' },
        { name: 'Marianela' },
        { name: 'Wilson' }
    ];
    const [queue, setQueue] = useState(participants);
    const mainSpeaker = queue.slice(0, 1);
    const upNextSpeakers = queue.slice(1, 4);
    let firstSixQueuedSpeakers = queue.slice(4, 10);
    let restOfQueuedSpeakers = queue.slice(10);
    return (
        <div className="app">
            <div className="side-a">
                <div className="header-background"/>
                <div className="header headline-centered">
                    N-Q-it!
                </div>
                <div className="main-speaker-title headline-centered">
                    <p>Main</p>
                </div>
                <div className="main-speaker-container">
                    {
                        mainSpeaker.map(({ name }) =>
                            <Speaker key={0} name={name}/>
                        )
                    }
                </div>

                <div className="up-next-title headline-centered ">
                    <p>Up next</p>
                </div>

                <div className="up-next-container">
                    {
                        upNextSpeakers.map(({ name }, index) =>
                            <Speaker key={index} name={name}/>
                        )
                    }
                </div>

                <div className="queued-title headline-centered">
                    <p>Queued</p>
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
                onPlus={() => setQueue([...queue, { name: 'ernesto' }])}
                onMinus={() => setQueue(queue.slice(1))}
            />
        </div>

    );
};

export default App;
