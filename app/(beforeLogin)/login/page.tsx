"use client"
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/dto/loginDTO";
import { postLogin } from "@/services/api/postLogin";
import { Logo } from "@/assets/images";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const reqBody: LoginRequest = {
        email: email,
        password: password,
      }
      const response = await postLogin(reqBody)

      if (!response.success) {
        alert("로그인 실패!")
        return;
      }

      // 쿠키에 token 저장
      document.cookie = `token=${response.data.accessToken}; path=/; secure; SameSite=Strict;`;

      router.push("/home")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
      <div className="z-10 w-[420px] h-[520px] flex flex-col gap-12 justify-center items-center m-auto py-32 rounded-3xl shadow-lg bg-white bg-opacity-60">
        <Image src={Logo} alt="logo" width={300} height={200} />

        <form className="flex flex-col justify-center w-80" onSubmit={handleSubmit}>
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
          <Button type="submit" className="mt-4 w-full h-10">
            로그인
          </Button>
        </form>

        <Link href="/signup">계정이 없으신가요?</Link>
      </div>
    </div>
  );
}
