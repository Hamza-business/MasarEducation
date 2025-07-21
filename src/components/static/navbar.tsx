import Link from "next/link";
import Logo from "./logo";
import { Container } from "../../app/(site)/container";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Header() {
  return (
      <header className="p-4 border-b bg-transparent backdrop-blur-sm z-10">
        <Container className="flex justify-between items-center">
          <h1 className="text-xl font-bold">MyApp</h1>
          <LanguageSwitcher type={"list"}/>
        </Container>
      </header>
  );
}
