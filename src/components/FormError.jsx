export const FormError = ({ error }) => {
    return (
        <div>
            {
                error && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops! </span>
                        {error.message}
                    </p>
                )         
            }
        </div>
    )
}