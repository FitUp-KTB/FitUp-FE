import {redirect} from "next/navigation";

export default function Root() {
  // redirect("/login");  // 배포 시 로그인으로 가게 해야 함
  redirect("/home");  // 개발 용: 홈으로 리다이렉트
}
