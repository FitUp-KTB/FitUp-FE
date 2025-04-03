import {ReactNode} from "react";
import GradientBackground from "@/app/(beforeLogin)/_component/GradientBackground";

type Props = {children: ReactNode}
export default function BeforeLoginLayout({children}: Props) {

  return (
    <>
      <GradientBackground />
      {children}
    </>
  )
}
