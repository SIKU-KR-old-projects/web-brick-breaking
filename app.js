// express 기본 모듈 불러오기
var express = require('express'), http = require('http');

// express 미들웨어 불러오기
var static = require('serve-static');

// express 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 8080);
app.set('host', '0.0.0.0');

// static 서버 미들웨어 사용
app.use(static(__dirname)); // 현재 폴더에 대한 정적 폴더를 설정

// express 서버 시작
http.createServer(app).listen(app.get('port'), app.get('host'), () => {
    console.log('Express server running at ' + app.get('port') + ' on ' + app.get('host'));
});
