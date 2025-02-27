"use client"
import Image from "next/image";
import {FormEvent, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {LoginRequest} from "@/dto/loginDTO";
import {postLogin} from "@/services/api/postLogin";

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
        throw new Error(response.message)
      }

      // 쿠키에 token 저장
      document.cookie = `token=${response.data.accessToken}; path=/; secure; SameSite=Strict;`;

      router.push("/home")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex h-full justify-center gap-20">
      <Image src="/images/logo.svg" alt="logo" width={300} height={200}/>
      <form className="flex flex-col min-h-screen justify-center w-96" onSubmit={handleSubmit}>
        <div>
          <label>이메일</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="mt-4 w-full">
          로그인
        </Button>
      </form>
    </div>
  );
}
