# knu-plate

# 가이드

## 개발 환경 실행

```sh
docker-compose up -d
```

## 테스트 디비 테이블 덤프

```sh
docker exec -it knu-plate_db-maria_1 mysqldump --all-databases -utest -ptest --no-data > db/0_db.sql
```
