import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
// import { xai } from '@ai-sdk/xai';
import { deepseek } from '@ai-sdk/deepseek';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': deepseek('deepseek-chat'),
        'chat-model-reasoning': wrapLanguageModel({
          model: deepseek('deepseek-reasoner'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': deepseek('deepseek-chat'),
        'artifact-model': deepseek('deepseek-chat'),
      },
    });
