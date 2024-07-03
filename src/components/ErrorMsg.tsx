export const ErrorMsg = ({children}: {children: React.ReactNode}) => {
  return (
    <p className="bg-red-600 text-white text-center text-sm font-semibold rounded-b py-1">
      {children}
    </p>
  )
}
