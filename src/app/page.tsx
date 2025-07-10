import Image from "next/image";
import Board from "./components/board";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <Board />
    </div>
  );
}
