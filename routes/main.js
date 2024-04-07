const express=require('express');
const router=express.Router();
const{UserData,RandomUser,UserExistence,AboveAge,UserNames}=require('../Controllers/main')

router.post('/user',UserData);
router.get('/user/random',RandomUser);
router.post('/user/exist',UserExistence);
router.post('/user/age',AboveAge);
router.get('/user/names',UserNames)
  

module.exports = router;