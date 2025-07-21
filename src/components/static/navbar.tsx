import Link from "next/link";
import Logo from "./logo";
import { Container } from "../../app/(site)/container";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Header() {
  return (
      <header className="p-4 border-b mb-12 ">
        <Container className="flex justify-between items-center">
          <h1 className="text-xl font-bold">MyApp</h1>
          <LanguageSwitcher type={"list"}/>
        </Container>
      </header>
      // <Container>
      //   <div className="relative flex h-14 items-center justify-between gap-3 rounded-sm bg-white/90 p-6 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
      //     <div className="flex flex-1 items-center">
      //       <Logo />
      //     </div>

      //     <ul className="flex flex-1 items-center justify-end gap-3">
      //       <li>
      //         <Link
      //           href="/signin"
      //           className="btn-sm bg-white text-gray-800 shadow-sm hover:bg-gray-50"
      //         >
      //           Login
      //         </Link>
      //       </li>
      //       <li>
      //         <Link
      //           href="/signup"
      //           className="btn-sm bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-900"
      //         >
      //           Register
      //         </Link>
      //       </li>
      //     </ul>
      //   </div>
      // </Container>
  );
}
