const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));//'combined'
app.use(express.json());

app.use(router);

app.listen(3000,()=>{console.log('listening on 3000');});

//一些常用第三方库
//cors, 
//helmet:作用是设置headers，每个header对应一个安全防范，用法和cors一模一样
//morgan：作用是添加日志信息
//winston:更全面的日志，发布的时候替换console.log

//当第三方库并没有加cors时怎么办？因为人家不希望前端直接调用
// A.com(server) -> actual data (NO CORS headers)
// B.com -> A.com (CORS issue)
// C.com(server) -> A.com (server)
// B.com -> C.com (include CORS header)
// cors-anywhere
