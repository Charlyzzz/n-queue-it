import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Speaker = ({ isMain, name }) => {
    return (
        <div className={isMain ? '' : 'Speaker-queued'}>
            <img src={logo} className={isMain ? 'Speaker-logo-main' : 'Speaker-logo-queued'} alt="logo"/>
            <p>
                {name}
            </p>
        </div>
    );
};

const Queued = ({ queued }) => {
    const empty = queued.length === 0;
    if (empty) {
        return <div/>;
    } else {
        return <div className="Queue-queued">
            <h2 className="UpNext">Siguen</h2>
            <TransitionGroup>
                {queued.map(({ name }, index) =>
                    <CSSTransition
                        in
                        appear
                        unmountOnExit
                        classNames="speaker"
                        key={index}
                        timeout={300}
                    >
                        <Speaker name={name}/>
                    </CSSTransition>)
                }
            </TransitionGroup>
        </div>;
    }
};

function Queue({ members }) {
    const [main, ...queued] = members;
    const empty = members.length === 0;
    return (
        <>
            {empty ? null :
                <div className="Queue-body">
                    <div className="Queue-main">
                        <Speaker isMain name={main.name}/>
                    </div>
                    <Queued queued={queued}/>
                </div>
            }
        </>
    );
}

const App = () => {
    const participants = [
        { name: 'Erwin' },
        { name: 'Erwin' }
    ];
    const [queue, setQueue] = useState(participants);
    return (
        <div className="App">
            <Queue members={queue}/>
            <div className="Actions">
                <div className="circle" onClick={() => setQueue([...queue, { name: 'Ernesto' }])}>
                    <span role="img" className="emoji" aria-label="hand">✋</span>
                </div>
                <div className="circle" onClick={() => setQueue(queue.slice(0, -1))}>
                    <span role="img" className="emoji" aria-label="no-women">🙅‍♀</span>️
                </div>
                <div className="circle" onClick={() => setQueue(queue.slice(1))}>
                    <span role="img" className="emoji" aria-label="no-women">-</span>️
                </div>
            </div>
        </div>
    );
};

export default App;
