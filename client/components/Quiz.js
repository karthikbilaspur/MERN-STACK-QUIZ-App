//components/Quiz.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Questions from "./Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";

export default function Quiz() {
    const [check, setChecked] = useState(undefined);
    const result = useSelector((state) => state.result.result);
    const { queue, trace } = useSelector((state) => state.questions);
    const dispatch = useDispatch();

    function onNext() {
        if (trace < queue.length) {
            dispatch(MoveNextQuestion());
            if (result.length <= trace) {
                dispatch(PushAnswer(check));
            }
        }
        setChecked(undefined);
    }

    function onPrev() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check) {
        setChecked(check);
    }

    if (result.length && result.length >= queue.length) {
        return <Navigate to={"/result"} replace={true}></Navigate>;
    }

    return (
        <div className="container">
            <h1 className="title text-light">Quiz Application</h1>
            <Questions onChecked={onChecked} />
            <div className="grid">
                {trace > 0 ? (
                    <button className="btn prev" onClick={onPrev}>
                        Prev
                    </button>
                ) : (
                    <div></div>
                )}
                <button className="btn next" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    );
}
