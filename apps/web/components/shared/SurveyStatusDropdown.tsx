"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import SurveyStatusIndicator from "@/components/shared/SurveyStatusIndicator";
import { useSurveyMutation } from "@/lib/surveys/mutateSurveys";
import { useSurvey } from "@/lib/surveys/surveys";
import {
  ErrorComponent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@formbricks/ui";
import { CheckCircleIcon, PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function SurveyStatusDropdown({
  surveyId,
  environmentId,
  updateLocalSurveyStatus,
}: {
  surveyId: string;
  environmentId: string;
  updateLocalSurveyStatus?: (status: "draft" | "inProgress" | "paused" | "completed" | "archived") => void;
}) {
  const { survey, isLoadingSurvey, isErrorSurvey } = useSurvey(environmentId, surveyId);
  const { triggerSurveyMutate } = useSurveyMutation(environmentId, surveyId);

  if (isLoadingSurvey) {
    return <LoadingSpinner />;
  }

  if (isErrorSurvey) {
    return <ErrorComponent />;
  }

  return (
    <>
      {survey.status === "draft" || survey.status === "archived" ? (
        <div className="flex items-center">
          <SurveyStatusIndicator status={survey.status} environmentId={environmentId} />
          <span className="mr-3 italic text-slate-500">
            {survey.status === "draft" && "Survey drafted"}
            {survey.status === "archived" && "Survey archived"}
          </span>
        </div>
      ) : (
        <Select
          onValueChange={(value) => {
            triggerSurveyMutate({ status: value })
              .then(() => {
                toast.success(
                  value === "inProgress"
                    ? "Survey live"
                    : value === "paused"
                    ? "Survey paused"
                    : value === "completed"
                    ? "Survey completed"
                    : ""
                );
              })
              .catch((error) => {
                toast.error(`Error: ${error.message}`);
              });

            if (updateLocalSurveyStatus)
              updateLocalSurveyStatus(value as "draft" | "inProgress" | "paused" | "completed" | "archived");
          }}>
          <SelectTrigger className="w-[200px] bg-white py-1.5">
            <SelectValue>
              <div className="flex items-center">
                <SurveyStatusIndicator status={survey.status} environmentId={environmentId} />
                <span className="ml-2 text-sm text-slate-700">
                  {survey.status === "draft" && "Survey drafted"}
                  {survey.status === "inProgress" && "Collecting insights"}
                  {survey.status === "paused" && "Survey paused"}
                  {survey.status === "completed" && "Survey complete"}
                  {survey.status === "archived" && "Survey archived"}
                </span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem className="group  font-normal hover:text-slate-900" value="inProgress">
              <PlayCircleIcon className="-mt-1 mr-1 inline h-5 w-5 text-slate-500 group-hover:text-slate-800" />
              Collect insights
            </SelectItem>
            <SelectItem className="group  font-normal hover:text-slate-900" value="paused">
              <PauseCircleIcon className="-mt-1 mr-1 inline h-5 w-5 text-slate-500 group-hover:text-slate-800" />
              Pause Survey
            </SelectItem>
            <SelectItem className="group  font-normal hover:text-slate-900" value="completed">
              <CheckCircleIcon className="-mt-1 mr-1 inline h-5 w-5 text-slate-500 group-hover:text-slate-800" />
              Complete Survey
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </>
  );
}
