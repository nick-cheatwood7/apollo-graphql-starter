export const sendEmail = async (to: string, body: string): Promise<void> => {
    console.log("Email: ", to, " | ", body);
};
