import store from '../store/index'

export async function showTooltipOnSuccess(func, message) {
    try {
        await func
        await store.dispatch(
            'tooltips/show',
            {text: message, type: "success"}
        )
    } catch (e) {
        await store.dispatch(
            'tooltips/show',
            {text: e, type: "error"}
        )
    }
}