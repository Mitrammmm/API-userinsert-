const UserModel = require('../model/user')

const cloudinary = require("cloudinary")
const bcrypt = require('bcrypt')

cloudinary.config({ 
    cloud_name: 'duuzlekjo', 
    api_key: '964546775877152', 
    api_secret: 'EpeiuNMw5jIwjAimZs0MYqp3u3M' 
  });


class UserController{
    static getalluser = async(req,res)=>{
        try{
            res.send('namaste')
        }
        catch(error){
            console.log(error)
        }
    }

    //user insert
    static userinsert = async(req,res)=>{
        try{
            // console.log(req.files.image);
            //code to upload image to cloudinary
            const file = req.files.image
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'UserProfileapi'
            })
            //console.log(imageUpload)
            //res.send("home page from FrontCntroller")
            // console.log(req.body)
            const {n,e,p,cp} = req.body
            const user = await UserModel.findOne({email:e})
            //console.log(user)
            if(user){
                res
                .status(401)
                .json({status:"failed",message:"email already exists!!"})
            }
            else{
                if(n&&e&&p&&cp){
                    if(p==cp){
                        const hashpassword = await bcrypt.hash(p,10)
                        const result = new UserModel({
                            name:n,
                            email:e,
                            password:hashpassword,
                            image:{
                                public_id:imageUpload.public_id,
                                url:imageUpload.secure_url
                            }
                        })
            
                        //to save data
                        await result.save();
                        res.status(201).json({
                            status:"success",
                            message:"Registration successfull!! Now login."
                        })
                    }
                    else{
                        res
                        .status(401)
                        .json({status:"failed",message:"pass & conform pass does not match"})
                    }
                }
                else{
                    res
                    .status(401)
                    .json({status:"failed",message:"all fields are required!"})
                }
            }

        }catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController