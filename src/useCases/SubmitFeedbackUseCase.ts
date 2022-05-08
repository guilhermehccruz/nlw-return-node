import { FeedbacksRepository } from '../repositories/FeedbacksRepository';
import { MailAdapter } from '../adapters/MailAdapter';

export interface SubmitFeedBackUseCaseRequest {
	type: string;
	comment: string;
	screenshot?: string;
}

export class SubmitFeedBackUseCase {
	constructor(
		private feedbacksRepository: FeedbacksRepository,
		private mailAdapter: MailAdapter,
	) {	}

	async execute(request: SubmitFeedBackUseCaseRequest) {
		const { type, comment, screenshot } = request;

		if (!type) {
			throw new Error('Type is required.');
		}

		if (!comment) {
			throw new Error('Comment is required.');
		}

		if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
			throw new Error('Invalid screenshot format.');
		}

		await this.feedbacksRepository.create({
			type,
			comment,
			screenshot,
		});

		await this.mailAdapter.sendMail({
			subject: 'Novo feedback',
			body: [
				`<p>Tipo do feedback: ${type}</p>`,
				`<p>Comentário: ${comment}</p>`,
			].join('\n'),
		});
	}
}
