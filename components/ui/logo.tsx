import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isWhite?: boolean;
}

export const Logo = ({ className, isWhite = false }: LogoProps) => {
  const textColor = isWhite ? "text-white" : "text-black dark:text-white";

  return (
    <div className={cn("inline-flex items-baseline font-oswald font-[900] tracking-tighter", className)}>
      {/* Letter H with rings */}
      <div className="relative">
        <div className="absolute -top-[0.45em] left-[0.1em] flex -space-x-[0.25em]">
          <div className="w-[0.55em] h-[0.55em] rounded-full border-[0.08em] border-[#FF9F00]" />
          <div className="w-[0.55em] h-[0.55em] rounded-full border-[0.08em] border-[#FF9F00]" />
        </div>
        <span className={textColor}>H</span>
      </div>

      <span className={textColor}>ar</span>

      {/* Letter i with split dot */}
      <div className="relative">
        {/* Added blue border around the entire split dot circle and moved it slightly up */}
        <div className="absolute top-[0.05em] left-1/2 -translate-x-1/2 w-[0.25em] h-[0.25em] rounded-full overflow-hidden flex transform scale-125 border-[0.02em] border-[#0088FF]">
          <div className="w-1/2 h-full bg-[#0088FF] border-none" />
          <div className="w-1/2 h-full bg-white border-none" />
        </div>
        <span className={textColor}>i</span>
      </div>

      <span className={textColor}>sh</span>

      {/* Pink accent circle */}
      <div className="w-[0.4em] h-[0.4em] rounded-full bg-[#FF2D55] ml-[0.12em] transform translate-y-[-0.12em]" />
    </div>
  );
};
