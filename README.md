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

# 4. Planet Scale
brew install planetscale/tap/pscale # planet scale 설치
brew install mysql-client           # myslq client 설치
pscale                              # 설치잘되었는지 확인
pscale auth login                   # 로그인
pscale database create <database> --region <region> # database 생성
npx prisma studio                   # DB 관리자 패널 설치 혹은 열기
npm install @prisma/client          # prisma client

# 5. Twilio (SMS)
npm install twilio                  # twilio sdk 설치

# 6. Send Grid (Email)
npm install --save @sendgrid/mail
```

2. 명령어

```bash
### [Planet Scale]
pscale connect <database>           # 컴퓨터와 planet scale 보안 연결하기 -> CLI
npx prisma db push                  # 변경된 DB 스키마 변경하기
pscale connect carrot-market        # DB와 prisma 연결
npx prisma generate                 # Prisma Client 생성했다는 정보 확인
```

3. Prisma

- DB 이용하기 위해선 무조건 DB가 실행된 상태여야함 (connect DB)
  ```
  pscale connect carrot-market
  ```
- schema.prisma에서 테이블 생성후엔 무조건 planet scale로 넘겨주어야함
  ```
  npx prisma db push
  ```
