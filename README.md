## 시작하기

해당 프로젝트는 노마드 코더의 [풀스택 캐럿마켓 클론코딩](https://nomadcoders.co/carrot-market)이다.

1. 설치하기

```bash
# 1. Next JS with typescript
npx create-next-app@latest --typescript

# 2. Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
## Tailwind Plugin (기본 요소를 tailwind 형태로 변환하는 플러그인)
npm install tailwindcss/forms

# 3. Prisma
npm i prisma -D
npx prisma # 처음일경우 npx prisma init

# 4. Planet Scale CLI
brew install planetscale/tap/pscale # planet scale 설치
brew install mysql-client           # client 설치
pscale                              # 설치잘되었는지 확인
pscale auth login                   # 로그인
pscale connect carrot-market        # DB와 prisma 연결
pscale database create <database> --region <region> # database 생성
```

2. 실행하기

```bash
# 1. 컴퓨터와 planet scale 보안 연결하기 -> CLI
pscale connect <database>
```
