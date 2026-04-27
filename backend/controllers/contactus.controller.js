
import { dbPool } from "../config/db.js";
import { sendMail } from "../config/email.js";

export const Contactus = async (req, res) => {
    try {

        const { formData } = req.body;
        const [result] = await dbPool.query(`INSERT INTO contact_messages 
     (name, email, subject, department, message)
      VALUES(?,?,?,?,?)`,
            [
                formData.name,
                formData.email,
                formData.subject,
                formData.department,
                formData.message]);

        await sendMail({
            subject: `${formData.subject}`,
            text: `
            Name: ${formData.name}
            Email: ${formData.email}
            Department: ${formData.department}

            Message:
            ${formData.message}
                `,
            to: `${formData.email}`
        });


        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to send message"
        });
    }

}
export const Getcontactus = async (req, res) => {
    try {
        const [data] = await dbPool.query(`
      SELECT 
        id,
        name,
        email,
        subject,
        department,
        message,
        created_at
      FROM contact_messages
      ORDER BY created_at DESC
    `);

        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch messages"
        });
    }
}