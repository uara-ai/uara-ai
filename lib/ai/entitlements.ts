import type { UserType } from '@/app/(auth)/auth';
import type { ChatModel } from './models';

interface Entitlements {
  maxMessagesPerDay: number;
  availableChatModelIds: Array<ChatModel['id']>;
}

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: [
      'grok-vision',
      'grok-standard',
      'gpt-4o-mini',
      'gpt-3.5-turbo'
    ],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: [
      'grok-vision',
      'grok-reasoning',
      'grok-standard',
      'gpt-4-turbo',
      'gpt-4-vision',
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-3.5-turbo'
    ],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
