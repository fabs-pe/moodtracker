import Image from "next/image";
import Main from "../../components/Main";
import Hero from "../../components/Hero";

export default function HomePage() {
  return (
    <Main className="fle min-h-screen flex-col items-center justify-between p-24">
        <Hero />
    </Main>
  );
}
