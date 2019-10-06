const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })

    
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':         
          res.status(400).send({
            error: 'Vui lòng cung cấp địa chỉ email chính xác'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Mật khẩu được cung cấp phải khớp với các quy tắc sau:
              <br>
              1. Nó phải chứa chỉ các ký tự sau: chữ thường, chữ hoa, chữ số.
              <br>
              2. mật khẩu dài ít nhất 8 kí tự và không dài hơn 32 kí tự.
            `
          })
          break   
        default:
          res.status(400).send({
            error: 'Sai thông tin đăng kí'
          })
      }
    } else {
      next()
    }
  },
  RegisterHospitalRequest (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      name_hospital: Joi.string().required(),
      address_hospital:  Joi.string().regex(
        new RegExp('([a-zA-Z0-9]{1,200}\s*)+$')
      ),
      phone_hospital:Joi.string().regex(
        new RegExp('^[0-9]{9,10}$')
      ),
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })

    
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':         
          res.status(400).send({
            error: 'Vui lòng cung cấp địa chỉ email chính xác'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Mật khẩu được cung cấp phải khớp với các quy tắc sau:
              <br>
              1. Nó phải chứa chỉ các ký tự sau: chữ thường, chữ hoa, chữ số.
              <br>
              2. mật khẩu dài ít nhất 8 kí tự và không dài hơn 32 kí tự.
            `
          })
          break
        case 'name_hospital':
          res.status(400).send({
            error: 'Vui lòng cung cấp tên bệnh viện chính xác !'
          })
          break
        case 'phone_hospital':
            res.status(400).send({
              error: 'Vui lòng cung cấp SĐT chính xác'
            })
            break
        case 'address_hospital':
          res.status(400).send({
            error: 'Vui lòng cung cấp địa chỉ chính xác !'
          })
          break
        default:
          res.status(400).send({
            error: 'Sai thông tin đăng kí'
          })
      }
    } else {
      next()
    }
  },
  patient (req, res, next) {
    const schema = {
      firstname: Joi.string().required(),
      lastname: Joi.string().trim(),
      phone:Joi.string().regex(
        new RegExp('^[0-9]{9,10}$')
      ),
      sex:Joi.string().min(2).max(3).required(),
      day: Joi.number().integer().min(1).max(31),
      month: Joi.number().integer().min(1).max(12),
      year: Joi.number().integer().min(1700).max(2019)
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })

    
    if (error) {
      switch (error.details[0].context.key) {
        case 'firstname':
          res.status(400).send({
            error: 'Vui lòng cung cấp họ và tên lót chính xác !'
          })
          break
        case 'lastname':
          res.status(400).send({
            error: 'Vui lòng cung cấp Tên chính xác !'
          })
          break
        case 'phone':
                res.status(400).send({
                  error: 'Vui lòng cung cấp SĐT chính xác'
                })
                break
         case 'day':
            res.status(400).send({
              error: 'Vui lòng cung cấp ngày sinh chính xác !'
            })
            break
        case 'month':
                res.status(400).send({
                  error: 'Vui lòng cung cấp tháng sinh chính xác'
                })
                break
        case 'year':
                res.status(400).send({
                  error: 'Vui lòng cung cấp năm sinh chính xác'
                })
                break
        case 'sex':
          res.status(400).send({
            error: 'Vui chọn giới tính'
          })
          break   
        default:
          res.status(400).send({
            error: 'Sai thông tin đăng kí'
          })
      }
    } else {
      next()
    }
  },

  hospital (req, res, next) {
    const schema = {
      name_hospital: Joi.string().required(),
      address_hospital: Joi.string().regex(
        new RegExp('([a-zA-Z0-9]{1,200}\s*)+$')
      ),
      phone_hospital:Joi.string().regex(
        new RegExp('^[0-9]{9,10}$')
      ),
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })

    if (error) {
      switch (error.details[0].context.key) {
        case 'name_hospital':
          res.status(400).send({
            error: 'Vui lòng cung cấp tên bệnh viện chính xác !'
          })
          break
        case 'phone_hospital':
                res.status(400).send({
                  error: 'Vui lòng cung cấp SĐT chính xác'
                })
                break
         case 'address_hospital':
            res.status(400).send({
              error: 'Vui lòng cung cấp địa chỉ chính xác !'
            })
            break
        default:
          res.status(400).send({
            error: 'Sai thông tin đăng kí'
          })
      }
    } else {
      next()
    }
  },
  doctor (req, res, next) {
    const schema = {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      sex:Joi.string().min(2).max(3).required(),
      phone: Joi.string().regex(
        new RegExp('^[0-9]{9,10}$')
      ),
      day: Joi.number().integer().min(1).max(31),
      month: Joi.number().integer().min(1).max(12),
      year: Joi.number().integer().min(1700).max(2019),
      specialize: Joi.string().required(),
      department: Joi.string().required(),
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })

    
    if (error) {
      switch (error.details[0].context.key) {
        case 'firstname':
          res.status(400).send({
            error: 'Vui lòng cung cấp họ và tên lót chính xác !'
          })
          break
        case 'lastname':
          res.status(400).send({
            error: 'Vui lòng cung cấp Tên chính xác !'
          })
          break
        case 'phone':
                res.status(400).send({
                  error: 'Vui lòng cung cấp SĐT chính xác'
                })
                break
         case 'day':
            res.status(400).send({
              error: 'Vui lòng cung cấp ngày sinh chính xác !'
            })
            break
        case 'month':
                res.status(400).send({
                  error: 'Vui lòng cung cấp tháng sinh chính xác'
                })
                break
        case 'year':
                res.status(400).send({
                  error: 'Vui lòng cung cấp năm sinh chính xác'
                })
                break
        case 'department':
          res.status(400).send({
            error: 'Vui lòng cung phòng ban sinh chính xác'
          })
            break   
        case 'specialize':
          res.status(400).send({
            error: 'Vui lòng cung cấp chuyên môn chính xác'
          })
          break
        case 'sex':
            res.status(400).send({
              error: 'Vui chọn giới tính'
            })
            break             
        default:
          res.status(400).send({
            error: 'Sai thông tin đăng kí'
          })
      }
    } else {
      next()
    }
  },
  updatedEmail (req, res, next) {
    const schema = {
      email: Joi.string().email()
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':         
          res.status(400).send({
            error: 'Vui lòng cung cấp địa chỉ email chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin đăng kí'
          })
      }
    } else {
      next()
    }
  },
  updateNameHospital (req, res, next) {
    const schema = {
      name_hospital: Joi.string().required()
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'name_hospital':         
          res.status(400).send({
            error: 'Vui lòng cung cấp Tên bệnh viện chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updatePhoneHospital (req, res, next) {
    const schema = {
      phone_hospital:Joi.string().regex(
        new RegExp('^[0-9]{9,10}$')
      )
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'phone_hospital':         
          res.status(400).send({
            error: 'Vui lòng cung cấp Số điện thoại bệnh viện chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updateEmailHospital (req, res, next) {
    const schema = {
      email_hospital: Joi.string().email()
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'email_hospital':         
          res.status(400).send({
            error: 'Vui lòng cung cấp Email chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updatePasswordHospital (req, res, next) {
    const schema = {
      password_hospital: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'password_hospital':
          res.status(400).send({
            error: `Mật khẩu được cung cấp phải khớp với các quy tắc sau:
            <br><br>
            1. Nó phải chứa chỉ các ký tự sau: chữ thường, chữ hoa, chữ số.
            <br><br>
            2. mật khẩu dài ít nhất 8 kí tự và không dài hơn 32 kí tự.
            </div>
          `
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },

  //patient
  updatePasswordPatient (req, res, next) {
    const schema = {
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'password':
          res.status(400).send({
            error: `Mật khẩu được cung cấp phải khớp với các quy tắc sau:
            <br><br>
            1. Nó phải chứa chỉ các ký tự sau: chữ thường, chữ hoa, chữ số.
            <br><br>
            2. mật khẩu dài ít nhất 8 kí tự và không dài hơn 32 kí tự.
            </div>
          `
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updateEmailPatient (req, res, next) {
    const schema = {
      email: Joi.string().email()
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':         
          res.status(400).send({
            error: 'Vui lòng cung cấp Email chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updateFirstNamePatient (req, res, next) {
    const schema = {
      first_name: Joi.string().required(),
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'first_name':
          res.status(400).send({
            error: 'Vui lòng cung cấp họ và tên lót chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updateLastNamePatient (req, res, next) {
    const schema = {
      last_name: Joi.string().regex(
        new RegExp('^[a-zA-Z]{1,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'last_name':
          res.status(400).send({
            error: 'Vui lòng cung cấp tên lót chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },

  //update info doctor by hospital

  
  updateFirstNameDoctor (req, res, next) {
    const schema = {
      firstname: Joi.string().required(),
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'firstname':
          res.status(400).send({
            error: 'Vui lòng cung cấp họ và tên lót chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updateLastNameDoctor (req, res, next) {
    const schema = {
      lastname: Joi.string().required(),
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'lastname':
          res.status(400).send({
            error: 'Vui lòng cung cấp tên chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },

  updateEmailDoctor (req, res, next) {
    const schema = {
      email: Joi.string().email(),
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Vui lòng cung cấp địa chỉ email chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin đăng kí'
          })
      }
    } else {
      next()
    }
  },

  updatePasswordDoctor (req, res, next) {
    const schema = {
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'password':
          res.status(400).send({
            error: `Mật khẩu được cung cấp phải khớp với các quy tắc sau:
            <br><br>
            1. Nó phải chứa chỉ các ký tự sau: chữ thường, chữ hoa, chữ số.
            <br><br>
            2. mật khẩu dài ít nhất 8 kí tự và không dài hơn 32 kí tự.
            </div>
          `
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updateSpecializeDoctor (req, res, next) {
    const schema = {
      specialize: Joi.string().required(),
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'specialize':
          res.status(400).send({
            error: 'Vui lòng cung cấp chuyên môn chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updateDepartmentDoctor (req, res, next) {
    const schema = {
      department: Joi.string().required(),
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'department':
          res.status(400).send({
            error: 'Vui lòng cung cấp phòng ban chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updateCmndDoctor (req, res, next) {
    const schema = {
      cmnd: Joi.string().regex(
        new RegExp('^[0-9]{9}$')
      )
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'cmnd':
          res.status(400).send({
            error: 'Vui lòng cung cấp CMND chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updatePhoneDoctor (req, res, next) {
    const schema = {
      phone: Joi.string().regex(
        new RegExp('^[0-9]{9,11}$')
      )
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'phone':
          res.status(400).send({
            error: 'Vui lòng cung cấp số điện thoại chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  updateSexDoctor (req, res, next) {
    const schema = {
      sex:Joi.string().min(2).max(3).required(),
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'sex':
          res.status(400).send({
            error: 'Vui lòng cung cấp giới tính chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },
  sendRequestSupport (req, res, next) {
    const schema = {
      birthday:Joi.date().iso()
    }
    const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
    if (error) {
      switch (error.details[0].context.key) {
        case 'birthday':
          res.status(400).send({
            error: 'Vui lòng cung cấp sinh nhật chính xác'
          })
          break 
        default:
          res.status(400).send({
            error: 'Sai thông tin cập nhật'
          })
      }
    } else {
      next()
    }
  },

// //general
//   updateBirthdayDoctor (req, res, next) {
//     const birth = req.body.birthday.split('-');
//     const day = birth[1]
//     const month = birth[2]
//     const year = birth[0]
//     const schema = {
//       birthday: Joi.string().required(),
//       month: Joi.string().email(),
//       year: Joi.string().required()
//     }
//     const {error} = Joi.validate(req.body, schema, { allowUnknown: true })
//     if (error) {
//       switch (error.details[0].context.key) {
//         case 'name':
//           res.status(400).send({
//             error: 'Vui lòng cung cấp đầy đủ họ và tên'
//           })
//           break
//         case 'email':
//           res.status(400).send({
//             error: 'Vui lòng cung cấp email chính xác'
//           })
//           break 
//         case 'message':
//           res.status(400).send({
//             error: 'Vui lòng điền vào thông tin cần hổ trợ'
//           })
//           break 
//         default:
//           res.status(400).send({
//             error: 'Sai thông tin'
//           })
//       }
//     } else {
//       next()
//     }
//   },
  
  
}


