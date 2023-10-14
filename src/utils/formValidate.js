export const formValidate = () => {
    return {
        required: {
            value: true,
            message: 'Field is required'
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: 'Email format is incorrect'
        },
        minLength: {
            value: 6,
            message: 'Min 6 character'
        },
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) {
                    return "No seas 🤡, escribe algo";
                }
                return true;
            },
        },
        validateEquals(value) {
            return {
                equals: (v) => v === value || "Password is not matched",
            };
        },
        patternURL: {
            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            message: 'URL format incorrect'
        }
    }
}