import { SubmitFeedBackUseCase } from './SubmitFeedbackUseCase';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedBackUseCase(
	{ create: createFeedbackSpy },
	{ sendMail: sendMailSpy },
);

describe('Submit feedback', ( ) => {
	it('should be able to submit a feedback', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'Example comment',
			'screenshot': 'data:image/png;base64,asdasdasdasdasd',
		})).resolves.not.toThrow();

		expect(createFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	});

	it('should not be able to submit a feedback without a type', async () => {
		await expect(submitFeedback.execute({
			type: '',
			comment: 'Example comment',
			'screenshot': 'data:image/png;base64,asdasdasdasdasd',
		})).rejects.toThrow();
	});

	it('should be able to submit a feedback without a comment', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: '',
			'screenshot': 'data:image/png;base64,asdasdasdasdasd',
		})).rejects.toThrow();
	});

	it('should be able to submit a feedback with an invalid screenshot', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'bugs bugs',
			'screenshot': 'teste.jpg',
		})).rejects.toThrow();
	});
});
