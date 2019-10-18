const {Patient} = require('../models')
const {Hospital} = require('../models')
const {Account} = require('../models')
const {Doctor} = require('../models')
const {HospitalRegister} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
    async register (req, res) {
      try {
        const user = await Account.create(req.body)
        const userJson = user.toJSON()
        res.send({
          user: userJson,
          token: jwtSignUser(userJson)
        })
      } catch (err) {
        res.status(400).send({
          error: 'Tài khoản email đã được sử dụng ' + err
        })
      }
    },
    async RegisterHospitalRequest (req, res) {
      try {
        const user = await HospitalRegister.create(req.body)
        const userJson = user.toJSON()
        res.send({
          user: userJson,
        })
      } catch (err) {
        res.status(400).send({
          error: 'Tài khoản email đã được sử dụng '+ err
        })
      }
    },
    async patient (req, res) {
      try {       
        const patient = await Patient.create(req.body)
        const patientJson = patient.toJSON()
        res.send(patientJson)
      } catch (err) {
        res.status(400).send({
          error: 'Có lỗi xãy ra ' + err
        })
      }
    },
    async hospital (req, res) {
      try {
        const hospital = await Hospital.create(req.body)
        const hospitalJson = hospital.toJSON()
        res.send(hospitalJson)
      } catch (err) {
        res.status(400).send({
          error: 'Có lỗi xãy ra '+err
        })
      }
    },
    async doctor (req, res) {
      try {       
        const doctor = await Doctor.create(req.body)
        const doctorJson = doctor 
        res.send(doctorJson)
      } catch (err) {
        res.status(400).send({
          error: 'Tài khoản email đã được sử dụng'+ err
        })
      }
    },

    async login (req, res) {
      try {
        const {email, password} = req.body
        const user = await Account.findOne({       
          where: {
            email: email
          }
        })
        
        if (!user) {
          return res.status(403).send({
            error: 'Thông tin đăng nhập không chính xác'
          })
        }
  
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
          return res.status(403).send({
            error: 'Thông tin đăng nhập không chính xác !'
          })
        }
       
        const userJson = user.toJSON();
        res.send({
          user:userJson,
          token: jwtSignUser(userJson)
        })
      } catch (err) { 
        res.status(500).send({                   
          error: 'xãy ra lỗi trong quá trình đăng nhập'+ err
        })
      }
    },
}