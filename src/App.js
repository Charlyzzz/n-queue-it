import React, { useState } from 'react';

const Speaker = ({ speaker: { name } }) => {
    return (
        <div className="card">
            <div className="speaker-logo"/>
            <div className="speaker-name">{name}</div>
        </div>
    );
};

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
            <div className="header-background"/>
            <div className="header headline-centered">
                N-Q-it!
            </div>
            <div className="main-speaker-title headline-centered">
                Main
            </div>
            <div className="main-speaker-container">
                MS
            </div>

            <div className="up-next-title headline-centered ">
                Up next
            </div>

            <div className="up-next-container">
                UNS
            </div>

            <div className="queued-title headline-centered">
                Queued
            </div>

            <div className="queued-container">
                {
                    new Array(100).fill(null).map((_, index) =>
                        <div key={index}>A</div>)
                }
            </div>


            {/*<div className="main">*/}
            {/*    <h2>Speaker</h2>*/}
            {/*    <div className="main-speaker">*/}
            {/*        {queue[0] ?*/}
            {/*            <Speaker*/}
            {/*                speaker={queue[0]}*/}
            {/*            /> : null*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="up-next">*/}
            {/*    <h2 className="lighter">Up next</h2>*/}
            {/*    <div className="up-next-speakers">*/}
            {/*        {*/}
            {/*            queue.slice(1, 4).map((speaker, index) =>*/}
            {/*                <Speaker*/}
            {/*                    speaker={speaker}*/}
            {/*                    key={index}*/}
            {/*                />)*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="queued">*/}
            {/*    <h2 className="lighter">Queued</h2>*/}
            {/*    <div className="queued-speakers">*/}
            {/*        {*/}
            {/*            queue.slice(4).map((speaker, index) => {*/}
            {/*                return <div key={index} className="queued-speaker">*/}
            {/*                    <Speaker*/}
            {/*                        speaker={speaker}*/}
            {/*                    />*/}
            {/*                </div>;*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}
            <FABs
                onPlus={() => setQueue([...queue, { name: 'ernesto' }])}
                onMinus={() => setQueue(queue.slice(1))}
            />
            {/*<Queue members={queue}/>*/}
            {/*<div className="Actions">*/}
            {/*    <div className="circle" onClick={() => setQueue([...queue, { name: 'Ernesto' }])}>*/}

            {/*    </div>*/}
            {/*    <div className="circle" onClick={() => setQueue(queue.slice(1))}>*/}
            {/*        <Emoji aria="no-women" emoji="🙅‍♀"/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

const Emoji = ({ aria, emoji }) =>
    <span role="img" className="emoji" aria-label={aria}>{emoji}</span>;

export default App;
