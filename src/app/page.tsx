import Image from "next/image";
import YouTubeEmbed from "./components/YoutubeEmbed";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <YouTubeEmbed  embedId="U8TD5_XbE_s" title="Esim"/>
    </main>
  );
}
