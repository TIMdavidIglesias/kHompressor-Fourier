// action - account reducer
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';

export const maxTimeUpdate = (maxTime) => {
    console.log(1)
    return {
        type: 'UPDATE_MAX_TIME',
        payload: maxTime,
    };
};

export const sampleRateUpdate = (sampleRate) => {
    return {
        type: 'UPDATE_SAMPLE_RATE',
        payload: sampleRate,
    };
};