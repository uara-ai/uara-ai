export const DEFAULT_CHAT_MODEL: string = 'grok-vision';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
  provider: 'x' | 'openai';
  capabilities: {
    vision: boolean;
    reasoning: boolean;
    contextWindow: number;
  };
}

export const chatModels: Array<ChatModel> = [
  // X (xAI) Models
  {
    id: 'grok-vision',
    name: 'Grok Vision',
    description: 'Latest Grok model with vision capabilities for image analysis and general chat',
    provider: 'x',
    capabilities: {
      vision: true,
      reasoning: true,
      contextWindow: 128000,
    }
  },
  {
    id: 'grok-reasoning',
    name: 'Grok Reasoning',
    description: 'Advanced reasoning model with step-by-step thinking capabilities',
    provider: 'x',
    capabilities: {
      vision: false,
      reasoning: true,
      contextWindow: 128000,
    }
  },
  {
    id: 'grok-standard',
    name: 'Grok Standard',
    description: 'Fast and efficient Grok model for general conversations',
    provider: 'x',
    capabilities: {
      vision: false,
      reasoning: false,
      contextWindow: 32000,
    }
  },
  // OpenAI Models
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'OpenAI\'s most capable model with enhanced performance and speed',
    provider: 'openai',
    capabilities: {
      vision: false,
      reasoning: true,
      contextWindow: 128000,
    }
  },
  {
    id: 'gpt-4-vision',
    name: 'GPT-4 Vision',
    description: 'GPT-4 with vision capabilities for image analysis and understanding',
    provider: 'openai',
    capabilities: {
      vision: true,
      reasoning: true,
      contextWindow: 128000,
    }
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Optimized GPT-4 model with faster response times',
    provider: 'openai',
    capabilities: {
      vision: true,
      reasoning: true,
      contextWindow: 128000,
    }
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Compact version of GPT-4o, faster and more cost-effective',
    provider: 'openai',
    capabilities: {
      vision: false,
      reasoning: true,
      contextWindow: 128000,
    }
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient model for general conversations',
    provider: 'openai',
    capabilities: {
      vision: false,
      reasoning: false,
      contextWindow: 16000,
    }
  }
];

