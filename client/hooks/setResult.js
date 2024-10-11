//hooks/setResult.js

import { postServerData } from "../helper/helper";
import * as Action from "../redux/reducer/questionReducer";

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result));
    } catch (error) {
        console.error("Error pushing answer:", error);
    }
};

export const updateResult = (payload) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(payload));
    } catch (error) {
        console.error("Error updating result:", error);
    }
};

/** insert user data */
export const usePublishResult = (resultData) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if (!result.length || !username) {
                throw new Error("Couldn't get Result: Invalid result or username.");
            }
            const port = process.env.PORT || 5000;
            const response = await postServerData(
                `http://localhost:${port}/api/result`,
                resultData
            );
            console.log("Result published:", response);
        } catch (error) {
            console.error("Error publishing result:", error);
        }
    })();
};
