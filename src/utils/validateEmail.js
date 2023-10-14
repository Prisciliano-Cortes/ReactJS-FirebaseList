export const validateEmail = (value, divError) => {
    if (/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/.test(value)) {
        divError.innerHTML = ''
        return true
    } else {
        divError.innerHTML = 'Email is incorrect'
        return false
    }
}