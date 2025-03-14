"use client"
import { Arrow_Logo, Default_Profile, Logo } from "@/assets/images"
import Image from "next/image"
import { CardDescription, CardTitle } from "../ui/card"
import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/api/getUserProfile";
import { UserProfileResponse } from "@/dto/userProfileDTO";

const Header = () => {
  const [userProfile, setUserProfile] = useState<UserProfileResponse>()

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const response = await getUserProfile()
    setUserProfile(response.data);
  }

  return (
    <header className="bg-white text-BLACK shadow-lg w-full h-16 flex pl-5 pr-5 justify-between">
      <div className="flex items-center gap-3">
        <div className="h-32 flex items-center">
          <Image src={Arrow_Logo} alt="mark" width={32} height={32} />
        </div>
        <Image src={Logo} alt="logo" width={100} height={66} />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Image src={Default_Profile} alt="profile" width={40} height={40} />
        <div>
          <CardTitle className="mt-2">{userProfile?.nickName}({userProfile?.name})</CardTitle>
          <CardDescription className="text-[12px]">{userProfile?.email}</CardDescription>
        </div>
      </div>
    </header>)
}

export default Header
