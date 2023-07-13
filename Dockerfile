# syntax=docker/dockerfile:1

# Docker base image는 node 18을 사용
FROM node:18 AS builder

# 컨테이너 내부에 작업 디렉터리 생성
WORKDIR /app

# image가 올라갔을 때 수행되는 명령어들
# -y 옵션을 넣어서 무조건 설치
RUN apt-get update

# 한글 지원을 위한 환경 변수 등록
ENV LANG=ko_KR.UTF-8 \
    LANGUAGE=ko_KR.UTF-8

# 한국 시간대 설정
ENV TZ=Asia/Seoul

# package 파일을 먼저 복사 후 package를 추가할 때만 npm ci를 실행
COPY package*.json ./
RUN npm ci

# 소스코드 복사
COPY . .

# 빌드
RUN npm run build

# 호스트와 연결할 포트 번호 설정
EXPOSE 8000

# 실행할 때는 node 18버전 alpine을 사용(이미지를 가볍게 하기 위해)
FROM node:18-alpine

# 컨테이너 내부에 작업 디렉터리 생성
WORKDIR /app

# 한글 지원을 위한 환경 변수 등록
ENV LANG=ko_KR.UTF-8 \
    LANGUAGE=ko_KR.UTF-8

# 한국 시간대 설정
ENV TZ=Asia/Seoul

# 환경 변수 설정 : development
ENV NODE_ENV=development

# 빌드된 이미지를 가져와 복사
COPY --from=builder /app ./

# # 컨테이너가 실행되었을 때 스크립트 실행 
# ENTRYPOINT ["npm", "run", "start:prod"]



