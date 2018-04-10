import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
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
  }

  get isStaff () {
    return this.isStaff
  }
}
