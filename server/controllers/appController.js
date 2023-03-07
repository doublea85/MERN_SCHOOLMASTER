import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import otpGenerator from 'otp-generator';



/** Middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        const { email } = req.method == "GET" ? req.query : req.body;

        //Check the user existance
        let exist = await UserModel.findOne({ email });
        if(!exist) return res.status(404).send({ error: "Cannot find User!" });

        next();

    } catch (error) {
       return res.status(404).send({ error: "Authentication error" });
    }
}

/** POST: http://localhost:3001/api/register 
 * @param : {
  "password" : "Adminadmin123",
  "email": "example@gmail.com",
  "firstName" : "Bill",
  "lastName": "William",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
    const { firstName, lastName, email, password, profile } = req.body;

    try {
        // check for existing email
        const existingUser = await UserModel.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).send({ error: 'Email address is already in use' });
        }

        if (password) {
            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new UserModel({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                profile: profile || '',
            });
            // save user
            const savedUser = await user.save();
            return res.status(201).send({ msg: 'User registered successfully' });
        } else {
            return res.status(400).send({ error: 'Password is required' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Server error' });
    }
}


/** POST: http://localhost:3001/api/login 
 * @param: {
  "email" : "example123",
  "password" : "admin123"
}
*/
export async function login(req,res){
   
    const { email, password } = req.body;

    try {
        
        UserModel.findOne({ email })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if(!passwordCheck)
                            return res.status(400).send({ error: "Don't have Password"});
                        

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        email : user.email
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            email: user.email,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}


/** GET: http://localhost:3001/api/user/example123 */
// export async function getUser(req,res){
//     const { email } = req.params;

//     try {
//         if(!email) return res.status(501).send({ error: "Invalide email"});

//         UserModel.findOne({ email }, function(err, user){
//             if(err) return res.status(500).send({ err });
//             if(!user) return res.status(501).send({ error: "Couldn't find the user"});

//             return res.status(201).send(user);
//         })
        
//     } catch (error) {
//         return res.status(404).send({ error: "Cannot find user data" });
//     }
// }

export async function getUser(req, res) {
    const { email } = req.params;
  
    try {
      if (!email) {
        return res.status(400).send({ error: "Invalid email" });
      }
  
      const user = await UserModel.findOne({ email }).exec();
  
      if (!user) {
        return res.status(404).send({ error: "Couldn't find the user" });
      }

      /** Remove password from user */
      /**
       * Converting user in to a json format then assign it to a new object
       * mongoose return unnecessary data with object so convert it into json
        */
      const { password, ...rest } = Object.assign({}, user.toJSON());
  
      return res.status(200).send(rest);

    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Server error" });
    }
}
  


/** PUT: http://localhost:3001/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
    try {
        // const id = req.query.id;
        const { userId } = rea.user;
        if (!userId) {
            return res.status(400).send({ error : "User ID not found...!" });
        }

        const body = req.body;
        await UserModel.updateOne({ _id: userId }, body);

        return res.status(201).send({ msg: "Record updated...!"});
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Server error" });
    }
}



/** GET: http://localhost:3001/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:3001/api/verifyOTP */
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:3001/api/createResetSession */
export async function createResetSession(req,res){
   if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
}


// update the password when we have valid session
/** PUT: http://localhost:3001/api/resetPassword */
export async function resetPassword(req,res){
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { email, password } = req.body;

        try {
            
            UserModel.findOne({ email})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ email : user.email },
                            { password: hashedPassword}, function(err, data){
                                if(err) throw err;
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg : "Record Updated...!"})
                            });
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}