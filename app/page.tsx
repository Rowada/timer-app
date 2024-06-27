import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-full max-w-4xl flex-col gap-8 p-4">
      <nav className="flex items-center justify-start">
        <Image src="/timer-icon.svg" width={50} height={50} alt="App icon" />
        <h1 className="text-lg">
          Time<span className="font-semibold text-primary">Master</span>
        </h1>
      </nav>
    </main>
  );
}
