import nodemailer from 'nodemailer';

export const email_address = process.env.NEXT_PUBLIC_API_EMAIL_ADDRESS;
export const email_password = process.env.NEXT_PUBLIC_API_EMAIL_PASSWORD;

export const Email = () => nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email_address,
        pass: email_password,
    }
});
