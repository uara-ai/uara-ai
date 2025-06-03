'use client';

import { startTransition, useMemo, useOptimistic, useState } from 'react';

import { saveChatModelAsCookie } from '@/app/(chat)/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { chatModels } from '@/lib/ai/models';
import { cn } from '@/lib/utils';

import { CheckCircleFillIcon, ChevronDownIcon } from './icons';
import { entitlementsByUserType } from '@/lib/ai/entitlements';
import type { Session } from 'next-auth';
import Image from 'next/image';

export function ModelSelector({
  session,
  selectedModelId,
  className,
  onModelChange,
}: {
  session: Session;
  selectedModelId: string;
  onModelChange?: (modelId: string) => void;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);

  const userType = session.user.type;
  const { availableChatModelIds } = entitlementsByUserType[userType];

  const availableChatModels = chatModels.filter((chatModel) =>
    availableChatModelIds.includes(chatModel.id),
  );

  const selectedChatModel = useMemo(
    () =>
      availableChatModels.find(
        (chatModel) => chatModel.id === optimisticModelId,
      ),
    [optimisticModelId, availableChatModels],
  );

  // Group models by provider
  const modelsByProvider = useMemo(() => {
    const grouped = availableChatModels.reduce((acc, model) => {
      if (!acc[model.provider]) {
        acc[model.provider] = [];
      }
      acc[model.provider].push(model);
      return acc;
    }, {} as Record<string, typeof availableChatModels>);

    return grouped;
  }, [availableChatModels]);

  const getCapabilityBadges = (model: typeof availableChatModels[0]) => {
    const badges = [];
    if (model.capabilities.vision) badges.push('Vision');
    if (model.capabilities.reasoning) badges.push('Reasoning');
    return badges;
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'x':
        return <Image src="/providers/logos/xai.svg" alt="xAI" width={20} height={20} />;
      case 'openai':
        return <Image src="/providers/logos/openai.svg" alt="OpenAI" width={20} height={20} />;
      default:
        return <Image src="/providers/logos/openai.svg" alt="OpenAI" width={20} height={20} />;
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          className,
        )}
      >
        <Button
          data-testid="model-selector"
          variant="outline"
          className="md:px-2 md:h-[34px] flex items-center gap-2"
        >
          <span className="text-sm">
            {getProviderIcon(selectedChatModel?.provider || '')}
          </span>
          <span className="hidden md:inline">
            {selectedChatModel?.name}
          </span>
          <span className="md:hidden">
            {selectedChatModel?.name.split(' ')[0]}
          </span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[350px]">
        {Object.entries(modelsByProvider).map(([provider, models], index) => (
          <div key={provider}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="font-bold flex items-center gap-2">
              <span className="text-lg">{getProviderIcon(provider)}</span>
              <span>
                {provider === 'x' ? 'xAI' : 'OpenAI'} Models
              </span>
            </DropdownMenuLabel>
            {models.map((chatModel) => {
              const { id } = chatModel;
              const capabilities = getCapabilityBadges(chatModel);

              return (
                <DropdownMenuItem
                  data-testid={`model-selector-item-${id}`}
                  key={id}
                  onSelect={() => {
                    setOpen(false);

                    startTransition(() => {
                      setOptimisticModelId(id);
                      saveChatModelAsCookie(id);
                      onModelChange?.(id);
                    });
                  }}
                  data-active={id === optimisticModelId}
                  asChild
                >
                  <button
                    type="button"
                    className="gap-4 group/item flex flex-row justify-between items-center w-full p-3"
                  >
                    <div className="flex flex-col gap-1 items-start flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{chatModel.name}</span>
                        {capabilities.length > 0 && (
                          <div className="flex gap-1">
                            {capabilities.map((capability) => (
                              <span
                                key={capability}
                                className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-full"
                              >
                                {capability}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground text-left">
                        {chatModel.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Context: {chatModel.capabilities.contextWindow.toLocaleString()} tokens
                      </div>
                    </div>

                    <div className="text-foreground dark:text-foreground opacity-0 group-data-[active=true]/item:opacity-100">
                      <CheckCircleFillIcon />
                    </div>
                  </button>
                </DropdownMenuItem>
              );
            })}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
