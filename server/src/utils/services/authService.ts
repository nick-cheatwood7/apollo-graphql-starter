import { Context } from "../../types/Context";

export const getUserId = (req: Context["req"]): string | null => {
    const userId = req.session.userId || null;
    return userId;
};
