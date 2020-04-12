import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Speaker from "./Speaker";

const debounceWithQueue = (fn, millis) => {
    let waitDebounce = true;
    let wasCalledWhileWaiting = false;
    let lastCallArgs = null;
    const timeout = setTimeout(() => {
        waitDebounce = false;
        if (wasCalledWhileWaiting) {
            debouncedFn(...lastCallArgs);
        }
    }, millis);
    const debouncedFn = (...args) => {
        if (!waitDebounce) {
            fn(...args);
            waitDebounce = true;
        } else {
            wasCalledWhileWaiting = true;
            lastCallArgs = args;
        }
    };
    return [timeout, debouncedFn];
};
/* eslint-disable */
const triggerRenderOnResize = () => {
    const [, updater] = useState(0);
    useEffect(() => {
        const onResized = () => {
            console.log("resize");
            //Trigger re-render
            updater(n => ~n);
        };
        const [timeout, debouncedOnResize] = debounceWithQueue(onResized, 500);
        window.addEventListener("resize", debouncedOnResize);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("resize", debouncedOnResize);
        };
    });
};
/* eslint-enable react-hooks/rules-of-hooks */

const Rest = ({ queue, name }) => {
    const shouldBlur = queue.length >= 1;
    const [ref, setCardRef] = useState(null);
    triggerRenderOnResize();
    return (
        <div className="card" ref={setCardRef}>
            <CSSTransition
                in={shouldBlur}
                appear={shouldBlur}
                exit={!shouldBlur}
                classNames='card-blur'
                timeout={350}>
                <Speaker name={name}/>
            </CSSTransition>
            {
                shouldBlur && ref ?
                    <Overlay cardRef={ref} queue={queue}/>
                    : null
            }
        </div>
    );
};

const Overlay = ({ cardRef, queue }) => {
    const { height } = cardRef.getBoundingClientRect();
    const margin = parseInt(window.getComputedStyle(cardRef)["margin"].replace("px", ""));
    const corrected = (axis) => ((axis - margin) / 2);
    const centeredHorizontallyAndVertically = { marginTop: corrected(height) };
    return (
        <div className="card__overlay" style={centeredHorizontallyAndVertically}>
            +{queue.length}
        </div>
    );
};

export default Rest;
