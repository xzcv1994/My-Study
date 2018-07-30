var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
var database;
var UserModel;
var UserSchema;
var doc;

var init = function(db,schema,model){
  console.log('init2 호출됨');

database = db;
UserSchema = schema;
UserModel = model;
}


var authUser = function(database,id,password,callback){
  console.log('authUser 호출됨2: ' + id + ', ' + password + ', ' + database);
UserModel = mongoose.model('users',UserSchema);
console.log(UserModel);
if(database){
  UserModel.find({"id" : id, "password" : password}, function(err, results){
    if(err){
      callback(err,null);
      return;
    }

    console.log('검색 결과 : ');
    console.dir(results);

    if(results.length > 0){
      console.log('일치하는 사용자 찾음');
      callback(null,results);
    } else{
      console.log('일치하는 사용자 없음');
      callback(null,null);
    }
  });
}
};

router.get('/',function(req,res){

   var id = req.query.id;
   var password = req.query.password;

    authUser(database,id,password,function(err,docs){
      if(err){
        console.error('로그인중 에러 발생 : ' + err.stack);
        return;
      }

      if(docs){
        console.log('로그인 성공');

        res.redirect('main2.html');
      } else{
        console.log('로그인 실패');
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
      }
    });
});

module.exports = router;
module.exports.init = init;
