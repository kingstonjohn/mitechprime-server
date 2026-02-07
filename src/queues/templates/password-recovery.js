import { ENVIRONMENT } from "../../common/config/environment.js";
import { baseTemplate } from "./baseTemplate.js";

export const passwordRecovery = (data) => {
	return baseTemplate(
		`<h1>OTP verification!</h1>
			<p>
				To continue your password recovery process we require you to complete the verification process by entering the One-Time Password (OTP) code provided:
			</p>
			<table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td align="center">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td align="center">
									<table border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td>
												<div class="button button--">${data.otp}</div>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<p>Thanks, <br />${ENVIRONMENT.APP.NAME} support Team</p>
			<p>
				<strong>P.S.</strong> Need immediate help getting started? Send us a mail at
				<a href="mailto:${ENVIRONMENT.RESEND.EMAIL}">${ENVIRONMENT.RESEND.EMAIL}</a>.
			</p>
			</table> `
	);
};