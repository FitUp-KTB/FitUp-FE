# FitUp-FE

### 1. 커밋 컨벤션 (Commit Convention)
커밋 메시지는 다음 형식을 따른다

```
<타입>: 커밋 내용
```

#### 1.1 커밋 타입  
| 타입       | 설명 |
|------------|--------------------------------|
| `feat`     | 새로운 기능 추가 |
| `fix`      | 버그 수정 |
| `refactor` | 코드 리팩토링 (기능 변경 없음) |
| `design`   | UI/UX 수정 (CSS, 레이아웃 변경 등) |
| `chore`    | 빌드 설정, 패키지 매니저 변경 등 |

#### 1.2 커밋 메시지 예시  
```
git commit -m "feat: 로그인 기능 구현"
git commit -m "fix: 로그인 시 잘못된 응답 처리 수정"
git commit -m "refactor: API 호출 로직 개선"
git commit -m "design: 로그인 페이지 버튼 색상 변경"
git commit -m "chore: eslint 규칙 추가"
```

### 2. 브랜치 전략
#### 2.1 브랜치 구조
- main : 운영 브랜치   
- dev : 개발 브랜치   
- Feature 브랜치
```
feat/기능명/#이슈번호 : 기능 개발 브랜치
fix/버그명/#이슈번호 : 버그 수정 브랜치
```
