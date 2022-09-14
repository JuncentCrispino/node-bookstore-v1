const resetPassword = (name) => {
  return `
    <html>
    <head>
        <style>

        </style>
    </head>
    <body>
        <p>Hi ${name},</p>
        <p>Your password has been changed successfully</p>
    </body>
    </html>
  `;
};

export default resetPassword;