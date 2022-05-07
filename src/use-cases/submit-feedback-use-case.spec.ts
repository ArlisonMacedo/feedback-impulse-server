import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"


const createFeebackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeebackSpy },
  { sendMail: sendMailSpy }
)


describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,sdhfdsjfi'
    })).resolves.not.toThrow()

    expect(createFeebackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,sdhfdsjfi'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,sdhfdsjfi'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback witgh and invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'tá tudo bugado',
      screenshot: 'test.jpg'
    })).rejects.toThrow()
  })
})