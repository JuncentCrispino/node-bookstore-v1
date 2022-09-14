const confirmEmail = (name) => {
  return `
  <html>
    <head>
        <style>

        </style>
    </head>
    <body>
        <p>Hi ${name},</p>
        <p>Your have successfully verified your email</p>
    </body>
  </html>`;
};

export default confirmEmail;