import {motion} from 'framer-motion'
import path from 'path';


const pathVariants  = {
    show: {
        d: "M6 18 18 6M6 6l12 12",
    },
    hide: {
        d: 'M3.75 4h16.5M3.75 12h16.5m-16.5 8h16.5'
    }
}

export default function DrawerButton({showDrawer}: {showDrawer: boolean}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-6 stroke-joobyDark"
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        initial='show'
        animate={showDrawer ? 'show' : 'hide'}
        transition={{
            
        }}
        variants={pathVariants}
      />
    </svg>
  );
}
