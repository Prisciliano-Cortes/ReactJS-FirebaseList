import { useContext } from "react"
//import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { UserContext } from "../context/UserProvider"
import { errorFirebase } from "../utils/errorFirebase"
import { FormError } from "../components/FormError"
import { FormInputText } from "../components/FormInputText"
import { formValidate } from "../utils/formValidate"
import { Title } from "../components/Title"
import { Button } from "../components/Button"

export const Register = () => {
    //const navigate = useNavigate()

    const { registerUser } = useContext(UserContext)

    const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm()
    const { required, patternEmail, minLength, validateTrim, validateEquals } = formValidate()

    const onSubmit = async({ email, password}) => {
        try {
            await registerUser(email, password)
            //navigate('/')
        } catch (error) {
            console.log("ERROR: ",error.code);
            const { code, message } = errorFirebase(error.code)
            setError(code, {
                message: message,
            });
        }
    }

    return (
        <div>
            <Title title={'Register'} />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInputText
                    type="email"
                    label="Email"
                    name='email'
                    placeholder="Email"
                    { 
                        ...register('email', { 
                            required,
                            pattern: patternEmail
                        }) 
                    }
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInputText>

                <FormInputText
                    type="password"
                    label="Password"
                    placeholder="Password"
                    { 
                        ...register('password', { 
                            required, 
                            minLength,
                            validate: validateTrim
                        }) 
                    }
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInputText>

                <FormInputText
                    type="password"
                    label="Repeat password"
                    placeholder="Password"
                    { 
                        ...register('repassword', { 
                            required,
                            validate: validateEquals(getValues("password"))
                        }) 
                    }
                    error={errors.repassword}
                >
                    <FormError error={errors.repassword} />
                </FormInputText>

                <Button text="Register" type='submit' />
            </form>
        </div>
    )
}