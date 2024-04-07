const User=require("../Models/Database")
const UserData= async(req,res)=>{
  const name=req.body.name;
  const DOB=req.body.DOB; 
  const age=req.body.age;
  const location=req.body.location;
   try {
      newUser = await User.create({
      name,
      DOB,
      age,
      location
    });
   } catch (error) {
     return res.status(400).json({ message: error.message });
   }
  res.status(200).send({ message: 'UserData added to the Database'});
}
const RandomUser = async (req, res) => {
  try {
    const count = await User.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomUser = await User.findOne().skip(randomIndex).select('-__v ').lean();
    
    return res.status(200).json(randomUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const UserExistence=async (req,res) =>{
  const {name}  = req.body;
   
  try {
    const userExists = await User.exists({ name });
    if(userExists===null){
      return res.status(500).json({ error: "False (user does not exist)" });
    }
    return res.status(200).json({ exists: userExists });

  } catch (err) {
    return res.status(500).json({ error: "False (user does not exist)" });
  }
   
}
const AboveAge = async (req, res) => {
  const { age } = req.body;
  try {
    const usersAboveAge = await User.find({ age: { $gte: age } }).select('-__v -DOB').lean();
    if(usersAboveAge.length==0){
      return res.status(200).json({ message:"No Data found"});
    }
    return res.status(200).json(usersAboveAge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const UserNames=async(req,res)=>{
  try {
    const users = await User.find({}, 'name');
    const names = users.map(user => user.name);
    if(names.length<=0){
      return res.status(200).json({ message:"No Data found"});
    }
    res.status(200).json(names);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}
   
module.exports={UserData,RandomUser,UserExistence,AboveAge,UserNames}



 