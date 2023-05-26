import { type RequestEventAction, z, RequestEventBase } from "@builder.io/qwik-city";

export const env = (req: RequestEventAction | RequestEventBase) => {
    const object = z.object({
        SESSION_NAME: z.string().min(1),
        AUTH_SESSION_NAME: z.string().min(1),
        SESSION_SECRET: z.string().min(1),
    })

    const list = {
        SESSION_NAME: req.env.get("SESSION_NAME"),
        AUTH_SESSION_NAME: req.env.get("AUTH_SESSION_NAME"),
        SESSION_SECRET: req.env.get("SESSION_SECRET"),
    }

    return object.parse(list)
}