import { useRouter } from "next/navigation"
import { ReactNode } from "react"

interface IProps {
      children: ReactNode,
      className?: string,
      fallbackUrl?: string,
}

const ButtonBack = ({ children, className, fallbackUrl }: IProps) => {
      const router = useRouter();

      const handleBack = () => {
            if (window.history.length > 1) {
                  router.back()
            } else if (fallbackUrl) {
                  router.push(fallbackUrl)
            } else {
                  router.push('/')
            }
      }

      return (
            <button onClick={handleBack} className={className}>
                  {children}
            </button>
      )
}

export default ButtonBack;
