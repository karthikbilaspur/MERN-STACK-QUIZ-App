//components/Questions.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchQestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

export default function Questions({ onChecked }) {
    const dispatch = useDispatch();
    const { trace } = useSelector((state) => state.questions);
    const result = useSelector((state) => state.result.result);
    const [{ isLoading, apiData, serverError }] = useFetchQestion();
    const questions = useSelector((state) => state.questions.queue[trace]);

    function onSelect(i) {
        dispatch(updateResult({ trace, checked: i }));
        onChecked(i); // Call the parent handler to update parent state
    }

    if (isLoading) return <h3 className="text-light">Loading...</h3>;
    if (serverError)
        return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;

    if (!questions) return <h3 className="text-light">No questions available</h3>;

    return (
        <div className="questions">
            <h2 className="text-light">{questions?.question}</h2>
            <ul key={questions?.id}>
                {questions?.options.map((q, i) => (
                    <li key={i}>
                        <input
                            type="radio"
                            value={i}
                            name={`options-${questions.id}`}
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                            checked={result[trace] === i}
                        />
                        <label className="text-primary" htmlFor={`q${i}-option`}>
                            {q}
                        </label>
                        <div
                            className={`check ${result[trace] === i ? "checked" : ""}`}
                        ></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
