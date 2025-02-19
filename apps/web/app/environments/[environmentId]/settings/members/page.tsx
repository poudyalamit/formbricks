import SettingsCard from "../SettingsCard";
import SettingsTitle from "../SettingsTitle";
import { EditMemberships } from "./EditMemberships";

export default function MembersSettingsPage({ params }) {
  return (
    <div>
      <SettingsTitle title="Team Members" />
      <SettingsCard title="Manage members" description="Add or remove members in your team.">
        <EditMemberships environmentId={params.environmentId} />
      </SettingsCard>
    </div>
  );
}
