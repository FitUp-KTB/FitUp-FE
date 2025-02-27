import { Default_Profile, FITUP_Logo } from "@/assets/images"
import Image from "next/image"

const Header = () => {
  return (
    <header className="bg-WHITE text-BLACK shadow w-full h-16 flex pl-5 pr-5 justify-between">
      <Image src={FITUP_Logo} alt="logo" width={100} height={66} />
      <Image src={Default_Profile} alt="profile" width={40} height={40} />
    </header>)
}

export default Header