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

const App = () => {
    const participants = [
        { name: 'Erwin' },
        { name: 'Nico' },
        { name: 'Ernesto' },
        { name: 'Agustin' },
        { name: 'Fernando' },
        { name: 'Fabian' },
        { name: 'Virginia' },
        { name: 'Marcelo' },
        { name: 'Horacio' },
        { name: 'Alberto' },
        { name: 'Marianela' },
        { name: 'Hernan Rogelio Arias ApellidoLargo' }
    ];
    const [queue, setQueue] = useState(participants);
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
                        queue.slice(0, 1).map(({ name }) =>
                            <div key={0} className="card main-speaker">
                                {name}
                            </div>
                        )
                    }
                </div>

                <div className="up-next-title headline-centered ">
                    Up next
                </div>

                <div className="up-next-container">
                    {
                        queue.slice(1, 4).map(({ name }, index) =>
                            <div key={index} className="card up-next-speaker">
                                {name}
                            </div>
                        )
                    }
                </div>

                <div className="queued-title headline-centered">
                    Queued
                </div>
            </div>
            <div className="side-b">
                <div className="queued-container">
                    {
                        queue.slice(4).map(({ name }, index) =>
                            <div key={index} className="card queued-speaker">
                                {name}
                            </div>
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

const Emoji = ({ aria, emoji }) =>
    <span role="img" className="emoji" aria-label={aria}>{emoji}</span>;

export default App;
