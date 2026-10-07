import WatchSimulator from "@/components/WatchSimulator";
import SimulationControls from "@/components/SimulationControls";
import { SimulationProvider } from "@/context/SimulationContext";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4">
      <SimulationProvider>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 w-full max-w-5xl">
          <WatchSimulator />
          <SimulationControls />
        </div>
      </SimulationProvider>
    </main>
  );
}
