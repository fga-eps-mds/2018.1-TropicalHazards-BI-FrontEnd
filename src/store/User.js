/* eslint-disable */

import JwtDecode from 'jwt-decode'
export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      console.log('chegou na classe user')
      return new User(obj)
    } catch (_) {
      return null
    }
  }

  constructor (obj) {
    this.id = obj.userId
    this.name = obj.username
    this.email = obj.email
    this.Staff = obj.isStaff
    console.log('criou o objeto')
  }

  get isStaff () {
    return this.isStaff
  }
}
