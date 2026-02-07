import { ENVIRONMENT } from "../../common/config/environment.js";
import { baseNotificationTemplate } from "./baseNotificationTemplate.js";

export const notification = (data) => {
    return baseNotificationTemplate(
        `<h1>${data.title}</h1>
            <p>
                ${data.content}
            </p>
            <p>
                <strong>P.S.</strong> Need immediate help getting started? Send us a mail at
                <a href="mailto:${ENVIRONMENT.RESEND.EMAIL}">${ENVIRONMENT.RESEND.EMAIL}</a>.
            </p>
            </table> `
    );
};