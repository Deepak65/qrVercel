let successResponse = (result = '', message = '') => {
    return {
        status: true,
        message: message,
        result: result
    }
}
let notifySuccessResponse = (result = '', message = '', count= '') => {
    return {
        status: true,
        message: message,
        result: result,
        count:count
    }
}
let successResponseSearch = (result = '',items = '', message = '') => {
    return {
        status: true,
        message: message,
        chef: result,
        items: items
    }
}

let failResponse = (message, errorMsg = '') => {
    return {
        status: false,
        message: message,
        error: errorMsg
    }
}

module.exports = {
    successResponse,
    failResponse,
    successResponseSearch,
    notifySuccessResponse
};
