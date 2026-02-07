import { ENVIRONMENT } from "../../common/config/environment.js"

export const message = (data) => {
    return (
        `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta name="color-scheme" content="light" />
            <meta name="supported-color-schemes" content="light" />
            <style>
                @font-face {
                    font-family: 'Aeonik-Air';
                    font-style: normal;
                    font-weight: 100;
                    font-display: swap;
                    src: url('https://fonts.grey.co/Aeonik-Air.woff') format('woff');
                }
        
                @font-face {
                    font-family: 'Aeonik-Thin';
                    font-style: normal;
                    font-weight: 200;
                    font-display: swap;
                    src: url('https://fonts.grey.co/Aeonik-Thin.woff') format('woff');
                }
        
                @font-face {
                    font-family: 'Aeonik';
                    font-style: normal;
                    font-weight: 400;
                    font-display: swap;
                    src: url('https://fonts.grey.co/Aeonik-Light.woff') format('woff');
                }
        
                @font-face {
                    font-family: 'Aeonik';
                    font-style: normal;
                    font-weight: 500;
                    font-display: swap;
                    src: url('https://fonts.grey.co/Aeonik-Regular.woff') format('woff');
                }
        
                @font-face {
                    font-family: 'Aeonik';
                    font-style: normal;
                    font-weight: 600;
                    font-display: swap;
                    src: url('https://fonts.grey.co/Aeonik-Medium.woff') format('woff');
                }
        
                @font-face {
                    font-family: 'Aeonik';
                    font-style: normal;
                    font-weight: 700;
                    font-display: swap;
                    src: url('https://fonts.grey.co/Aeonik-Bold.woff') format('woff');
                }
        
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: 'Aeonik', 'Nunito Sans', 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
                }
        
                html,
                body {
                    padding: 0;
                    margin: 0;
                    background: #f7f7f7;
                }
        
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
        
                a {
                    text-decoration: none;
                    color: #1a1a1a;
                }
        
                .app-links {
                    display: flex;
                    width: 100%;
                    flex-wrap: wrap;
                    background-color: #ffffff;
                    color: #17191c;
                    padding: 0;
                    border-radius: 12px;
                    height: 100%;
                }
        
                .app-links .link-info {
                    flex: 1;
                    padding: 1rem 0;
                    padding-right: 1rem;
                }
        
                .app-links .mobile-img {
                    flex: 1;
                    display: none;
                    width: 100%;
                    /* background-image: url(https://res.cloudinary.com/abokiafrica/image/upload/v1676642569/mail%20template/Skewed_right_f3bi12.png); */
                    /* background-size: 100%; */
                    /* background-repeat: no-repeat; */
                    /* background-position: bottom right; */
                }
        
                @media (min-width: 600px) {
                    .app-links .mobile-img {
                        display: initial;
                    }
        
                    .app-links .link-info {
                        max-width: 48%;
                    }
                }
        
                @media (max-width: 600px) {
                    .login-btn {
                        padding: 8px 10px !important;
                    }
        
                    .footer {
                        width: 100% !important;
                    }
        
                    .support-break {
                        display: none;
                    }
        
                    .welcome-message {
                        padding: 0 28px !important;
                    }
        
                    .media-td {
                        padding-top: 0;
                    }
        
                    .transaction {
                        width: 100% !important;
                        padding: 0 !important;
                    }
        
                    .title {
                        padding: 0 28px !important;
                    }
                }
        
                .top-section {
                    background: #ffffff;
                    color: #17191c;
                }
        
                .top-section .support a {
                    color: #3d5cf5;
                }
        
                .bottom-section {
                    width: 100%;
                    text-align: center;
                    padding-top: 60px;
                }
        
                .support {
                    color: #3d5cf5;
                }
        
                .title {
                    text-align: left;
                    font-weight: 700;
                    padding: 0px 44px;
                    font-size: 1.5rem;
                    padding-top: 0;
                    margin-bottom: 16px;
                    font-weight: 700;
                    font-size: 1.5rem;
                    line-height: 120%;
                    color: #17191c;
                }
        
                .logo-white {
                    display: none !important;
                    width: 100%;
                }
        
                .logo-black {
                    display: block !important;
                    width: 100%;
                }
        
                @media (prefers-color-scheme: dark) {
                    body {
                        color: #f7f7f8;
                        background: #0e0f12;
                    }
        
                    .top-section {
                        background: #17191c;
                        color: #f7f7f8;
                    }
        
                    .title {
                        color: #ffff !important;
                    }
        
                    .app-links {
                        background: #131417;
                        color: #ffffff;
                    }
        
                    .app-links .small-text {
                        color: #e6e6e6;
                    }
        
                    .support {
                        color: #9eadfa;
                    }
        
                    .bottom-section {
                        color: #9aa0ac;
                    }
        
                    .bottom-section tbody tr td p span.support a {
                        color: #ffffff;
                    }
        
                    .logo-white {
                        display: block !important;
                    }
        
                    .logo-black {
                        display: none !important;
                    }
        
                    .detail-wrapper {
                        background: #23252a !important;
                    }
        
                    .transaction-detail {
                        color: #f1f2f4 !important;
                        border-bottom: 0.5px solid #40454f !important;
                    }
        
                    .transaction-detail-last {
                        color: #f1f2f4 !important;
                        border-bottom: 0px solid #40454f !important;
                    }
        
                    .body {
                        background: #0e0f12 !important;
                    }
                }
        
                @media (prefers-color-scheme: light) {
                    body {
                        background: #f7f7f7 !important;
                    }
        
                    .transaction-detail {
                        color: #131212 !important;
                    }
        
                    .detail-wrapper {
                        background: #f0f6fe !important;
                    }
                }
            </style>
        </head>
        
        <body>
            <div style="width: 100%; background: #f4f5f7" class="body">
                <div style="padding-top: 50px; padding-bottom: 20px">
                    <div style="max-width: 800px; margin: 0 auto; border: 0.336601px solid rgba(19, 18, 18, 0.1); border-radius: 8px;" class="top-section">
                        <table>
                            <tbody style="font-size: 10px; color: #1a1a1a; font-weight: 500">
                                <tr class="logo-black" style="float: left; width: 100%; padding: 40px 44px">
                                    <td>
                                        <img src="https://res.cloudinary.com/dbfynwrbk/image/upload/v1714862608/fizomarkt_g3xidm.png" alt="${ENVIRONMENT.APP.NAME}" style="width: 86.5px; height: 86.75px" />
                                    </td>
                                </tr>
        
                                <tr class="logo-white" style="float: left; width: 100%; padding: 40px 44px">
                                    <td>
                                        <img src="https://res.cloudinary.com/dbfynwrbk/image/upload/v1714862608/fizomarkt_g3xidm.png" alt="${ENVIRONMENT.APP.NAME}" style="width: 86.5px; height: 86.75px" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
        
                        <table style="width: 100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <p style="padding-top: 40px; text-align: left; font-weight: 700; padding: 0px 44px; font-size: 1rem; font-weight: 400; margin-bottom: 16px;" class="welcome-message">
                                            ${data?.title}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="overflow: hidden; padding: 10px 48px" class="transaction">
                                        <div style="width: 100%; max-width: 190%; margin: auto; margin-bottom: 2rem; padding: 1.5rem 1.5rem; border-radius: 8px; background: #f0f6fe; color: #131212" class="detail-wrapper">
                                            ${data?.message}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 44px 40px 44px; font-size: 1rem" class="welcome-message">
                                        <p style="font-weight: 300; line-height: 30px; font-size: 1rem">
                                            Contact our support team if you have any issues: <span class="support"> <a href="mailto:${ENVIRONMENT.RESEND.EMAIL}">${ENVIRONMENT.RESEND.EMAIL}</a> </span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
        </html>        
        `
    )
}