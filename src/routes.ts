import { Request, Response, Router } from 'express';
import { NodemailerMailAdapter } from './adapters/NodeMailer/NodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedBackUseCase } from './useCases/SubmitFeedbackUseCase';

export const routes = Router();

routes.post('/feedbacks', async (req: Request, res: Response) => {
	const { type, comment, screenshot } = req.body;

	const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
	const nodemailerMailAdapter = new NodemailerMailAdapter();

	const submitFeedbackUseCase = new SubmitFeedBackUseCase(
		prismaFeedbacksRepository,
		nodemailerMailAdapter,
	);

	await submitFeedbackUseCase.execute({
		type, comment, screenshot,
	});

	return res.status(201).send();
});
