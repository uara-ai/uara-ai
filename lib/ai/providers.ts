import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { openai } from '@ai-sdk/openai';
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
        // X (xAI) Models
        'grok-vision': xai('grok-2-vision-1212'),
        'grok-reasoning': wrapLanguageModel({
          model: xai('grok-3-mini-beta'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'grok-standard': xai('grok-2-1212'),
        
        // OpenAI Models
        'gpt-4-turbo': openai('gpt-4-1106-preview'),
        'gpt-4-vision': openai('gpt-4-vision-preview'),
        'gpt-4o': openai('gpt-4o'),
        'gpt-4o-mini': openai('gpt-4o-mini'),
        'gpt-3.5-turbo': openai('gpt-3.5-turbo'),
        
        // Utility Models (for internal use)
        'title-model': xai('grok-2-1212'),
        'artifact-model': xai('grok-2-1212'),
      },
      imageModels: {
        'x-image': xai.image('grok-2-image'),
        'openai-image': openai.image('dall-e-3'),
      },
    });
