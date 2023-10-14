import { useState } from "react"
import { Title } from "../components/Title"
import { useFirestore } from "../hooks/useFirestore"
import { Button } from "../components/Button"
import { useForm } from "react-hook-form"
import { formValidate } from "../utils/formValidate"
import { FormInputText } from "../components/FormInputText"
import { FormError } from "../components/FormError"
import { errorFirebase } from "../utils/errorFirebase"

export const Home = () => {

    const [copy, setCopy] = useState({});
    const [newOrigin, setNewOrigin] = useState('')

    const { 
        data, 
        error, 
        loading, 
        addDataFirestore, 
        deleteDataFirebase, 
        updateDataFirebase } = useFirestore()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        resetField,
        setValue } = useForm();

    const { required, patternURL } = formValidate()

    if (loading.getData) {
        return <p>Loading...</p>
    }
    
    if (error) {
        return <p>{error}</p>
    }

    const onSubmit = async ({ url }) => {
        try {
            if (newOrigin) {
                await updateDataFirebase(newOrigin, url);
            } else {
                await addDataFirestore(url);
            }
            
            setNewOrigin("");
            resetField("url");
        } catch (error) {
            const { code, message } = errorFirebase(error.code);
            setError(code, { message });
        }
    };

    const handleClickDelete = async(nanoid) => {
        await deleteDataFirebase(nanoid)
    }

    const handleClickEdit = (item) => {
        setValue("url", item.origin);
        setNewOrigin(item.nanoid);
    };

    const handleClickCopy = async (nanoid) => {
        await navigator.clipboard.writeText(window.location.href + nanoid);
        setCopy((prev) => ({ ...prev, nanoid }));
    };

    return (
        <div>
            <Title title='Home' />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInputText
                    type='text'
                    label="Enter URL"
                    placeholder="Enter your URL"
                    {...register("url", {
                        required,
                        pattern: patternURL,
                    })}
                    error={errors.url}
                >
                    <FormError error={errors.url} />
                </FormInputText>

                <Button 
                    type="submit"
                    color={newOrigin ? "red" : "blue" }
                    text={ newOrigin ? "EDIT URL" : "ADD URL" }
                    loading={newOrigin ? loading.updateData :  loading.addData}
                />
            </form>

            {
                data && data?.map(item => (
                    <article
                        key={item.nanoid}
                        className="p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-3"
                    >
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {window.location.href + item.nanoid}
                        </h5>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {item.origin}
                        </p>

                        <div className="flex space-x-2">
                            <Button 
                                type='submit'
                                text='DELETE URL'
                                color="red"
                                loading={loading[item.nanoid]}
                                onClick={() => handleClickDelete(item.nanoid)}
                            />

                            <Button 
                                type='submit'
                                text='UPDATE URL'
                                color="blue"
                                onClick={() => handleClickEdit(item)}
                            />

                            <Button 
                                type='submit'
                                text={copy?.nanoid === item.nanoid ? "Copied!" : "Copy ShortUrl"}
                                color="red"
                                onClick={() => handleClickCopy(item.nanoid)}
                            />
                        </div>
                    </article>
                ))
            }
        </div>
    )
}