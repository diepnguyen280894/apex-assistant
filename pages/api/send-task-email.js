import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { task } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: '📌 Bạn có nhiệm vụ mới!',
    text: `Nhiệm vụ: ${task}`,
  });

  res.status(200).json({ success: true });
}