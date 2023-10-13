import Algoshow from "../components/algoshow/Algoshow";
import Header from "../components/ui/header/Header";

export default function Home() {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-screen flex-col items-center  gap-4 px-16 pt-4  w-full">
        <Algoshow></Algoshow>
      </main>
    </>
  );
}
