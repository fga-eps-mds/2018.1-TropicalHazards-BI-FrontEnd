import user from "@/store/Authentication/auth"


export default {

    guest (to, from, next) {
        next(!user.check())
    },

    auth (to, from, next) {
        next(user.check() ? true : {
            path: "/auth",
            query: {
                redirect: to.name
            }
        })
    }
}
