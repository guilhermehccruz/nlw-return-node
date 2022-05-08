import { MailAdapter, SendMailData } from '../MailAdapter';
import { createTransport } from 'nodemailer';

const transport = createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: '6eee0dd798354f',
		pass: '00ca718dc727e2',
	},
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body }: SendMailData) {

		await transport.sendMail({
			from: 'Equipe Feedget <from@email.com>',
			to: 'Guilherme Cruz <to@email.com',
			subject,
			html: body,
		});
	}
}
