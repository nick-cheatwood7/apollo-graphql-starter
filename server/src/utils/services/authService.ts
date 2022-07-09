import { Context } from "../../types/Context";

export const getUserId = (context: Context): string | null => {
    const userId = context.req.session.userId || null;
    return userId;
};
