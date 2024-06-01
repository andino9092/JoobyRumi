import { ReactNode } from "react";
import { motion } from "framer-motion";

export interface NavBarItemProps {
  children?: ReactNode;
  onMouseOver?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
}

export default function NavBarItem({
  children,
  onMouseLeave,
  onMouseOver,
}: NavBarItemProps) {
  return (
    <motion.div
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      className="hover:bg-joobyLightPink hover:text-joobyDarkPink transition-all text-base text-center justify-center px-8 bg-joobyWhite text-joobyDark h-12 flex items-center "
    >
      {children}
    </motion.div>
  );
}
