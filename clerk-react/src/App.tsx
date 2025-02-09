import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/clerk-react";
import ProtectPage from "./protectPage";
import ExternalDataPage from "./extranalData";

export const Test = () => {
  return <>Hi, It's protected</>;
};
export default function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton></SignOutButton>
        </SignedIn>
      </header>
      <ProtectPage children={Test} />
      <ExternalDataPage />
    </>
  );
}
