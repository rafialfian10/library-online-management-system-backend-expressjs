const transporter = require("../../../config/nodemailer");

exports.sendVerificationEmail = async (user, token) => {
  const response = { data: null, error: null };

  try {
    // send mail with defined transport object
    response.data = await transporter.sendMail({
      from: process.env.SENDER_NAME,
      to: user.email, // list of receivers
      subject: "Email Verification", // Subject line
      text: "Hello world?", // plain text body
      html: `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Library Online</title>
              </head>
              <body>
                <table
                  style="width: 100% !important"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                >
                  <tbody>
                    <tr>
                      <td align="center">
                        <table
                          style="
                            border: 1px solid #eaeaea;
                            border-radius: 5px;
                            margin: 40px 0;
                          "
                          width="600"
                          cellspacing="0"
                          cellpadding="40"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td align="center" style="background-color: #fad3e7">
                                <div
                                  style="
                                    font-family: -apple-system, BlinkMacSystemFont,
                                      'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
                                      'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                      sans-serif;
                                    text-align: left;
                                    width: 465px;
                                  "
                                >
                                  <table
                                    style="width: 100% !important"
                                    width="100%%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td align="center">
                                          <div>
                                            <img 
                                              src="https://res.cloudinary.com/dixxnrj9b/image/upload/v1717235493/library-online-management-system/logo-library-online_erva3r.png"
                                              alt="Library Online"
                                              width="200px"
                                              height="65px"
                                              class="CToWUd"
                                              data-bit="iit"
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="justify">
                                          <h1
                                            style="
                                              color: #000;
                                              font-family: -apple-system, BlinkMacSystemFont,
                                                'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                                'Cantarell', 'Fira Sans', 'Droid Sans',
                                                'Helvetica Neue', sans-serif;
                                              font-size: 20px;
                                              font-weight: normal;
                                              margin: 30px 0;
                                              padding: 0 !important;
                                            "
                                          >
                                            <span class="il">Verify</span> your email to
                                            Register with <b>Library Online</b>
                                          </h1>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p
                                    style="
                                      color: #000;
                                      font-family: -apple-system, BlinkMacSystemFont,
                                        'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                        'Cantarell', 'Fira Sans', 'Droid Sans',
                                        'Helvetica Neue', sans-serif;
                                      font-size: 14px;
                                      line-height: 24px;
                                    "
                                  >
                                    Hello <b>${user.username}</b>,
                                  </p>
                                  <br />
                                  <p
                                    style="
                                      color: #000;
                                      font-family: -apple-system, BlinkMacSystemFont,
                                        'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                        'Cantarell', 'Fira Sans', 'Droid Sans',
                                        'Helvetica Neue', sans-serif;
                                      font-size: 14px;
                                      line-height: 24px;
                                    "
                                  >
                                  To complete the registration process, please enter the OTP code below in your Library Online application :
                                  </p>
                                  <br />
                                  <table
                                    style="width: 100% !important"
                                    width="100%%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td align="center">
                                          <div>
                                            <p
                                              style="
                                                background-color: #0081c9;
                                                border-radius: 5px;
                                                color: whitesmoke;
                                                display: inline-block;
                                                font-family: -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI', 'Roboto',
                                                  'Oxygen', 'Ubuntu', 'Cantarell',
                                                  'Fira Sans', 'Droid Sans',
                                                  'Helvetica Neue', sans-serif;
                                                font-size: 20px;
                                                font-weight: 1000;
                                                line-height: 50px;
                                                text-align: center;
                                                text-decoration: none;
                                                width: 200px;
                                              "
                                            >
                                              <span class="il">${token}</span>
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <br />
                                  <!-- <p
                                    style="
                                      color: #000;
                                      font-family: -apple-system, BlinkMacSystemFont,
                                        'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                        'Cantarell', 'Fira Sans', 'Droid Sans',
                                        'Helvetica Neue', sans-serif;
                                      font-size: 14px;
                                      line-height: 24px;
                                    "
                                  >
                                    Or copy and paste this URL into a new tab of your
                                    browser:
                                  </p>
                                  <p
                                    style="
                                      color: #000;
                                      font-family: -apple-system, BlinkMacSystemFont,
                                        'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                        'Cantarell', 'Fira Sans', 'Droid Sans',
                                        'Helvetica Neue', sans-serif;
                                      font-size: 14px;
                                      line-height: 24px;
                                    "
                                  >
                                    <a
                                      href="{{.URL}}"
                                      style="color: #067df7; text-decoration: none"
                                      target="_blank"
                                      >{{.URL}}</a
                                    >
                                  </p> -->
                                  <br />
                                  <hr
                                    style="
                                      border: none;
                                      border-top: 1px solid gray;
                                      margin: 26px 0;
                                      width: 100%;
                                    "
                                  />
                                  <p
                                    style="
                                      color: #666666;
                                      font-family: -apple-system, BlinkMacSystemFont,
                                        'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                        'Cantarell', 'Fira Sans', 'Droid Sans',
                                        'Helvetica Neue', sans-serif;
                                      font-size: 12px;
                                      line-height: 24px;
                                    "
                                  >
                                    If you didn't attempt to register but received this
                                    email, please ignore this email.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </body>
            </html>
            `,
    });
  } catch (error) {
    response.error = error.message;
  }

  return response;
};

exports.sendPayFineEmail = async (fine) => {
  const response = { data: null, error: null };

  try {
    response.data = await transporter.sendMail({
      from: process.env.SENDER_NAME,
      to: fine.user.email,
      subject: "Email Verification",
      text: "Hello world?",
      html: `<!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Library Online - Payment Confirmation</title>
                </head>
                <body>
                  <table
                    style="width: 100% !important"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                  >
                    <tbody>
                      <tr>
                        <td align="center">
                          <table
                            style="
                              border: 1px solid #eaeaea;
                              border-radius: 5px;
                              margin: 40px 0;
                            "
                            width="600"
                            cellspacing="0"
                            cellpadding="40"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td align="center" style="background-color: #fad3e7">
                                  <div
                                    style="
                                      font-family: -apple-system, BlinkMacSystemFont,
                                        'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
                                        'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                        sans-serif;
                                      text-align: left;
                                      width: 465px;
                                    "
                                  >
                                    <table
                                      style="width: 100% !important"
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td align="center">
                                            <div>
                                              <img 
                                                src="https://res.cloudinary.com/dixxnrj9b/image/upload/v1717235493/library-online-management-system/logo-library-online_erva3r.png"
                                                alt="Library Online"
                                                width="200px"
                                                height="65px"
                                                class="CToWUd"
                                                data-bit="iit"
                                              />
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="justify">
                                            <h1
                                              style="
                                                color: #000;
                                                font-family: -apple-system, BlinkMacSystemFont,
                                                  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                                  'Cantarell', 'Fira Sans', 'Droid Sans',
                                                  'Helvetica Neue', sans-serif;
                                                font-size: 20px;
                                                font-weight: normal;
                                                margin: 30px 0;
                                                padding: 0 !important;
                                              "
                                            >
                                              Payment Confirmation for Your Fine at <b>Library Online</b>
                                            </h1>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <p
                                      style="
                                        color: #000;
                                        font-family: -apple-system, BlinkMacSystemFont,
                                          'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                          'Cantarell', 'Fira Sans', 'Droid Sans',
                                          'Helvetica Neue', sans-serif;
                                        font-size: 14px;
                                        line-height: 24px;
                                      "
                                    >
                                      Hello <b>${fine.user.username}</b>,
                                    </p>
                                    <br />
                                    <p
                                      style="
                                        color: #000;
                                        font-family: -apple-system, BlinkMacSystemFont,
                                          'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                          'Cantarell', 'Fira Sans', 'Droid Sans',
                                          'Helvetica Neue', sans-serif;
                                        font-size: 14px;
                                        line-height: 24px;
                                      "
                                    >
                                    Thank you for your payment. Below are the details of your transaction:
                                    </p>
                                    <br />
                                    <table
                                      style="width: 100% !important"
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td><strong>Username :</strong></td>
                                          <td>${fine.user.username}</td>
                                        </tr>
                                        <tr>
                                          <td><strong>Book :</strong></td>
                                          <td>${fine.book.title}</td>
                                        </tr>
                                        <tr>
                                          <td><strong>Total Fine :</strong></td>
                                          <td>${fine.totalFine}</td>
                                        </tr>
                                        <tr>
                                          <td><strong>Order ID :</strong></td>
                                          <td>${fine.idOrder}</td>
                                        </tr>
                                        <tr>
                                          <td><strong>Status Transaction :</strong></td>
                                          <td>${fine.status}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <br />
                                    <br />
                                    <hr
                                      style="
                                        border: none;
                                        border-top: 1px solid gray;
                                        margin: 26px 0;
                                        width: 100%;
                                      "
                                    />
                                    <p
                                      style="
                                        color: #666666;
                                        font-family: -apple-system, BlinkMacSystemFont,
                                          'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                          'Cantarell', 'Fira Sans', 'Droid Sans',
                                          'Helvetica Neue', sans-serif;
                                        font-size: 12px;
                                        line-height: 24px;
                                      "
                                    >
                                      If you didn't make this payment but received this
                                      email, please contact our support immediately.
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </body>
              </html>      
            `,
    });
  } catch (error) {
    response.error = error.message;
  }

  return response;
};
