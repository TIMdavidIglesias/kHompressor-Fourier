const initialState = {
    maxTime: 5,
    sampleRate: 50,
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_MAX_TIME':
            return {
                ...state,
                maxTime: action.payload,
            };
        case 'UPDATE_SAMPLE_RATE':
            return {
                ...state,
                sampleRate: action.payload,
            };
        default:
            return state;
    }
};

export default settingsReducer;