import { AnimatePresence, motion } from "framer-motion";

export interface NavBannerProps {
  showBanner: boolean;
  setShowBanner: (val: boolean) => void;
}

export default function NavBanner({
  showBanner,
  setShowBanner,
}: NavBannerProps) {
  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{
            height: "0px",
            opacity: 0,
          }}
          animate={{
            height: "28px",
            opacity: 1,
          }}
          exit={{
            height: "0px",
            opacity: 0,
          }}
          onClick={() => setShowBanner(false)}
          className="w-screen fixed mt-[68px] sm:mt-0 text-joobyDark z-10 hover:cursor-pointer font-semibold bg-joobyDarkPink flex justify-center text-center items-center py-1 font-sans sm:absolute"
        >
          Free shipping for orders over __ !!
          <div className="absolute pr-6 right-0 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              className="w-4 h-4 hover:cursor-pointer stroke-joobyDark"
              onClick={() => {
                setShowBanner(false);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
