import type { RequestEventAction, RequestEventBase } from "@builder.io/qwik-city"
import { env } from "./env"
import { type AuthSession, readCookie } from "./session.server"

export const getUserId = async (req: RequestEventAction | RequestEventBase) => {
    const { cookie } = req
    const { AUTH_SESSION_NAME, SESSION_SECRET} = env(req)

    const cookieValue = cookie.get(AUTH_SESSION_NAME)?.value

    if(!cookieValue) return null

    const session = await readCookie<AuthSession>(cookieValue, SESSION_SECRET)

    return session.userId
}

export const requireAuth = async(req: RequestEventBase | RequestEventAction, redirect = "/") => {
    const authId = await getUserId(req)

    // need fix for server functions
    if(!authId) throw (req as any).redirect(302, redirect)

    return authId
}


export const requireVisitor = async(req: RequestEventBase | RequestEventAction, redirect = "/") => {
    const authId = await getUserId(req)

    // need fix for server functions
    if(authId) throw (req as any).redirect(302, redirect)
}