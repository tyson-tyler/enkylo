import { Anton } from "next/font/google";

// Import Anton font
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full cursor-pointer hover:scale-95 transition rounded-md">
      {/* Background Video */}
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-10 text-blue-50">
        <div>
          <h1
            className={`${anton.className} text-white font-bold leading-tight drop-shadow-lg 
              text-2xl sm:text-3xl md:text-4xl lg:text-6xl`}
          >
            {title}
          </h1>

          {/* Description only on large screens */}
          {description && (
            <p className="hidden lg:block mt-4 max-w-xl text-lg lg:text-xl opacity-90">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function LatestGame() {
  return (
    <section className="bg-black pb-52 px-[20px] md:px-[70px]">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="text-lg font-semibold text-gray-100 mb-2">
            Into the Enkylo Layer
          </p>

          <p className="max-w-md font-semibold text-lg text-blue-50 opacity-50">
            Immerse yourself in a rich and free ever-expanding universe where a
            vibrant array of products converge into an interconnected overlay
            experience on your world.
          </p>
        </div>
      </div>

      {/* Bento Card - Always shown */}
      <div className="relative mb-7 h-[28rem] w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755244110/Untitled_Video_-_Made_With_Clipchamp_2_cjtgyq.mp4"
          title="Action"
          description="A high-octane action shooter where you battle through enemy strongholds, unleash devastating combos, and fight to reclaim a world on the brink of collapse."
        />
      </div>

      {/* Grid Layout */}
      <div className="lg:grid h-auto grid-cols-1  md:grid-cols-2 md:grid-rows-4 gap-8">
        <div className="h-[400px] md:h-[860px] md:row-span-2">
          <BentoCard
            src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755244114/Untitled_Video_-_Made_With_Clipchamp_3_vskb7k.mp4"
            title="Adventure"
            description="Explore vast landscapes, uncover hidden secrets, and embark on an unforgettable journey."
          />
        </div>

        <div className="h-[400px] mt-7 lg:mt-0">
          <BentoCard
            src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755244111/Untitled_Video_-_Made_With_Clipchamp_5_qk5vuu.mp4"
            title="Thriller"
            description="A tense, edge-of-your-seat experience where every choice matters."
          />
        </div>
        <div className="h-[400px] mt-7 lg:mt-0">
          <BentoCard
            src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755244111/Untitled_Video_-_Made_With_Clipchamp_4_bupqzs.mp4"
            title="Survival"
            description="Fight to stay alive against overwhelming odds in a hostile world."
          />
        </div>
        <div className="h-[400px] mt-7 lg:mt-0">
          <BentoCard
            src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755247857/Untitled_Video_-_Made_With_Clipchamp_8_mw9qdi.mp4"
            title="Racing"
            description="Push your limits on high-speed tracks and drift your way to glory."
          />
        </div>
        <div className="h-[400px] mt-7 lg:mt-0">
          <BentoCard
            src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755247857/Untitled_Video_-_Made_With_Clipchamp_6_tlbkzj.mp4"
            title="Fantasy"
            description="Wield magic, tame mythical beasts, and rewrite the fate of kingdoms."
          />
        </div>
        <div className="h-[400px] mt-7 lg:mt-0">
          <BentoCard
            src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755247861/Untitled_Video_-_Made_With_Clipchamp_7_dxhpfc.mp4"
            title="Horror"
            description="Descend into darkness where your fears become reality."
          />
        </div>
        <div className="h-[400px] bg-red-500 mt-7 lg:mt-0">
          <BentoCard
            src="https://res.cloudinary.com/dnia0cr41/video/upload/v1755244116/Untitled_Video_-_Made_With_Clipchamp_9_ox7vtg.mp4"
            title="Explore More"
            description="Explore More AAA games at only on Enkylo"
          />
        </div>
      </div>
    </section>
  );
}
