import BentoGrid from "@/components/sections/BentoGrid";
import HeroLanding from "@/components/sections/HeroLanding";
import InfoLanding from "@/components/sections/InfoLanding";
import PreviewLanding from "@/components/sections/PreviewLanding";
import { infos } from "@/config/landing";

export default function Page() {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} />
    </>
  );
}
