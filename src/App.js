import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // ES6.
import "./animations.css";
import QueuedSpeaker from "./components/QueuedSpeaker";
import Speaker from "./components/Speaker";
import FABs from "./components/Fab";


const App = () => {
    const participants = [
        { name: "Erwin" },
        { name: "Nico" }
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
                            <Speaker name={name}/>
                        )
                    }
                </div>

                <div className="up-next-title headline-centered ">
                    <p>Up next</p>
                </div>

                <TransitionGroup className="up-next-container">
                    {
                        upNextSpeakers.map(({ name }, index) =>
                            <CSSTransition
                                classNames='card-animation'
                                timeout={350}
                                key={index}>
                                <Speaker name={name}/>
                            </CSSTransition>
                        )
                    }
                </TransitionGroup>

                <div className="queued-title headline-centered">
                    <p>Queued</p>
                </div>
                <TransitionGroup className="queued-container">
                    {
                        firstSixQueuedSpeakers.map(({ name }, index) =>
                            <CSSTransition
                                classNames='card-animation'
                                timeout={350}
                                key={index}>
                                <QueuedSpeaker
                                    key={index}
                                    name={name}
                                    index={index}
                                    queue={restOfQueuedSpeakers}/>
                            </CSSTransition>
                        )
                    }
                </TransitionGroup>
            </div>
            <FABs
                onPlus={() => setQueue([...queue, { name: "ernesto" }])}
                onMinus={() => setQueue(queue.slice(1))}
            />
        </div>

    );
};

export default App;
