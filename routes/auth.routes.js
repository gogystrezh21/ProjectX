const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const {check,validationResult } = require('express-validator')

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Minimum 4 symbols').isLength({min:4})
  ],
  async (req, res)=> {
  try {


    const errors = validationResult(req)


    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(), message:'Invalid password, username and email'});
    }

    const {email, password, username}= req.body

    const candidate = await User.findOne({username})
    if (candidate) {
    return res.status(400).json({message: "User with this username is exist"})
  }
    const emailRegistration = await User.findOne({email})
    if (emailRegistration) {
    return res.status(400).json({message: "User with this email is exist"})
  }

  const hashedPassword = await bcrypt.hash(password, 7);
  const user = new User({username, password: hashedPassword, email})

  await user.save()

  res.status(201).json({message: "Rigistration is completed"})

  } catch (e) {
    res.status(500).json({message: "Registration error"})
  }
})

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').normalizeEmail().isEmail(),
    check('password', 'Minimum 4 symbols').isLength({min:4})
  ],
  async (req, res)=> {
    try {
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), message:'Invalid password and email'});
  }

  const {email, password}= req.body 

  const user = await User.findOne({email})

  if (!user) {
    return res.status(400).json({message:'User is not exist'})
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    return res.status(400).json({message:"Invalid password"})
  }
  

  const token = jwt.sign(
    {userId: user.id},
    config.get('jwtSecret'),
    {expiresIn:'1h'}
  )

  res.status(200).json({userId: user.id, token, message: 'Login is completed'});


} catch (e) {
  res.status(500).json({message: "Registration error"})
}
})

  


module.exports = router