export default class Project {
    static from (payload){
        try {
            return new Project(payload)
        } catch (_) {
            return null
        }
    }
    constructor (payload){
        this.id = payload.id
        this.user = payload.user
        this.name = payload.name
        this.description = payload.description
        this.tags = payload.tags // improve tags later
        this.table_id = payload.table_id
    }
}
