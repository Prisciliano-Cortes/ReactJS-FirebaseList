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

export const Login = () => {

    //const navigate = useNavigate()

    const { loginUser, loading, setLoading } = useContext(UserContext)

    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const { required, patternEmail, minLength, validateTrim } = formValidate()

    const onSubmit = async({ email, password}) => {
        try {
            await loginUser(email, password)
            //navigate('/')
        } catch (error) {
            console.log("ERROR: ",error.code);
            const { code, message } = errorFirebase(error.code)
            setError(code, {
                message: message,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Title title={'Log-In'} />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInputText
                    type="email"
                    label="Email"
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

                <Button text="Register" type='submit' loading={loading} />
            </form>
        </div>
    )
}