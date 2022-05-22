export const FETCH_DATA = "FETCH_DATA";


export const addData = (payload) => {
    return {
        type: FETCH_DATA,
        payload
    }
}