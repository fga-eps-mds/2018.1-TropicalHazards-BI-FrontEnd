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

  constructor ({ userId, name, email, isStaff }) {
    this.id = userId // eslint-disable-line camelcase
    this.name = name
    this.email = email
    this.isStaff = isStaff
  }

  get isStaff () {
    return this.isStaff
  }
}
