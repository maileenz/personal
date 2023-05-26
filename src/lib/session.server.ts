import { sealData, unsealData } from 'iron-session'
import type { RequestEventAction, RequestEventBase,CookieOptions } from "@builder.io/qwik-city"
import { env } from './env'

export type Language = 'ro' | "en"

export interface Session  {
    theme?: 'light'
    language?: Language
  }
  
export interface AuthSession  {
    userId: string
  }


export const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: [365, 'days']
}

export const setCookie = async (data: Partial<Session | AuthSession>, password: string) => await sealData(data, { password })

export const readCookie = async <T = unknown>(cookie = '', password: string) => await unsealData<T>(cookie, { password })

export const updateSession = async (req: RequestEventAction | RequestEventBase, data: {
  name: string,
  session: Partial<Session | AuthSession>
}, sessionOptions?:CookieOptions) => {
    const { cookie } = req
    const { SESSION_SECRET} = env(req)
    const { name, session } = data


    const current = cookie.get(name)

    const currentCookie = current ? await readCookie<AuthSession>(current.value, SESSION_SECRET) : undefined

    cookie.set(name, await setCookie({
      ...currentCookie,
      ...session
    }, SESSION_SECRET), {
      ...cookieOptions,
      ...sessionOptions
    })

}