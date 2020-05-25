const logger = (store) => (next) => (action) => {
    const { getState } = store;
    console.group()
    console.log('Action Type', action.type)
    const returnValue = next(action)
    console.log('New State is: ', getState())
    console.groupEnd()
    return returnValue
}

export default logger