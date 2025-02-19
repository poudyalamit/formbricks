"use client";

import { getQuestionDefaults, questionTypes, universalQuestionPresets } from "@/lib/questions";
import { PlusIcon } from "@heroicons/react/24/solid";
import { createId } from "@paralleldrive/cuid2";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { cn } from "@formbricks/lib/cn";
import { useProduct } from "@/lib/products/products";
import { ErrorComponent } from "@/../../packages/ui";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface AddQuestionButtonProps {
  addQuestion: (question: any) => void;
  environmentId: string;
}

export default function AddQuestionButton({ addQuestion, environmentId }: AddQuestionButtonProps) {
  const { product, isLoadingProduct, isErrorProduct } = useProduct(environmentId);

  const [open, setOpen] = useState(false);

  if (isLoadingProduct) return <LoadingSpinner />;
  if (isErrorProduct) return <ErrorComponent />;

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className={cn(
        open ? "scale-100 shadow-lg" : "scale-97 shadow-md",
        "w-full space-y-2 rounded-lg border border-dashed border-slate-300 bg-white transition-transform duration-300 ease-in-out hover:cursor-pointer"
      )}>
      <Collapsible.CollapsibleTrigger asChild className="group h-full w-full">
        <div className="inline-flex">
          <div className="bg-brand-dark flex w-10 items-center justify-center rounded-l-lg group-aria-expanded:rounded-bl-none">
            <PlusIcon className="h-6 w-6 text-white" />
          </div>
          <div className="px-4 py-3">
            <p className="font-semibold">Add Question</p>
            <p className="mt-1 truncate text-sm text-slate-500">Add a new question to your survey</p>
          </div>
        </div>
      </Collapsible.CollapsibleTrigger>
      <Collapsible.CollapsibleContent className="justify-left flex flex-col ">
        {/* <hr className="py-1 text-slate-600" /> */}
        {questionTypes.map((questionType) => (
          <button
            key={questionType.id}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 last:mb-2 hover:bg-slate-100"
            onClick={() => {
              addQuestion({
                id: createId(),
                type: questionType.id,
                ...universalQuestionPresets,
                ...getQuestionDefaults(questionType.id, product),
              });
              setOpen(false);
            }}>
            <questionType.icon className="text-brand-dark -ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
            {questionType.label}
          </button>
        ))}
      </Collapsible.CollapsibleContent>
    </Collapsible.Root>
  );
}
