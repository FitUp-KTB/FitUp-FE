"use client"

import {FormEvent, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Logo, ChevronBack} from "@/assets/images";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {postSignup} from "@/services/api/postSignup";
import {SignupRequest} from "@/dto/signupDTO";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [genderError, setGenderError] = useState(false);

  const router = useRouter();

  const handleSetGender = (gender: "MALE" | "FEMALE") => {
    setGenderError(false);
    setGender(gender)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!gender) {
      setGenderError(true);
      return;
    }
    setGenderError(false);

    // 회원가입 API 호출
    try {
      const reqBody: SignupRequest = {email: email, password: password, gender: gender, name: name};
      const response = await postSignup(reqBody)

      if (!response.success) {
        alert("회원가입 실패!")
        return;
      }

      // 쿠키에 token 저장
      document.cookie = `token=${response.data.accessToken}; path=/; secure; SameSite=Strict;`;

      router.push("/home");
    } catch (error) {
      console.error(error);
    }


  }

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
      <div
        className="relative z-10 w-[800px] h-[520px] flex flex-row gap-16 justify-center items-center m-auto py-32 rounded-3xl shadow-lg bg-white bg-opacity-60">
        <Button className="bg-transparent absolute top-4 left-4 hover:bg-WHITE" onClick={() => router.back()}>
          <Image src={ChevronBack} alt="로그인으로 돌아가기"/>
        </Button>

        <div>
          <Image src={Logo} alt="logo" width={300} height={200}/>
        </div>

        <form className="flex flex-col justify-center w-80" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>이름</label>
            <Input
              type="text"
              value={name}
              className="border-gray-400"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>이메일</label>
            <Input
              type="email"
              value={email}
              className="border-gray-400"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>비밀번호</label>
            <Input
              type="password"
              value={password}
              className="border-gray-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4 mb-1 justify-center align-middle">
            <Button
              type="button"
              onClick={() => handleSetGender("MALE")}
              className={
                `px-6 py-3 rounded-full border transition font-medium text-gray-700 hover:bg-WHITE
              ${gender === "MALE"
                  ? "bg-WHITE border-black"
                  : "bg-transparent border-gray-300"}
              `}
            >
              남자
            </Button>
            <Button
              type="button"
              onClick={() => handleSetGender("FEMALE")}
              className={
                `px-6 py-3 rounded-full border transition font-medium text-gray-700 hover:bg-WHITE
                ${gender === "FEMALE"
                  ? "bg-WHITE border-black"
                  : "bg-transparent border-gray-300 "}
              `}
            >
              여자
            </Button>
          </div>

            <p className={`text-red-500 text-sm text-center ${genderError ? "opacity-100" : "opacity-0"}`}>성별을 선택해주세요.</p>

          <Button type="submit" className="mt-4 w-full h-10">
            회원가입
          </Button>

        </form>

      </div>
    </div>
  );
}
