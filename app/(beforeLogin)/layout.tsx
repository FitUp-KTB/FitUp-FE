import {ReactNode} from "react";
import GradientBackground from "@/app/(beforeLogin)/_component/gradientBackground";

type Props = {children: ReactNode}
export default function BeforeLoginLayout({children}: Props) {

  return (
    <>
      <GradientBackground />
      {children}
    </>
  )
}
