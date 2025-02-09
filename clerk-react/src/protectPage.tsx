import { Protect } from "@clerk/clerk-react";

export default function ProtectPage({ children }: { children: any }) {
  return (
    <Protect
      permission="org:admin:example"
      fallback={<p>You do not have the permissions to create an invoice.</p>}
    >
      {children}
    </Protect>
  );
}
