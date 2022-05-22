export const LOADING = "LOADING";


export const setLoading = (payload) => {
    return {
        type: LOADING,
        payload
    }
}