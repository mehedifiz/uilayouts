// @ts-nocheck
'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip-doc';

import {
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'motion/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRef } from 'react';
import { apps } from '../constant';

const Component = React.forwardRef((props, ref) => (
  <Image {...props} ref={ref} alt='App' />
));

Component.displayName = 'ForwardedComponent';

const MotionComponent = motion(Component);

function HomeMagnifiedDocOneFile() {
  const mouseX = useMotionValue(Infinity);
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const handleClick = (i) => {
    setPrevIndex(index);
    setIndex(i);
  };

  const isForward =
    index > prevIndex || (index === 0 && prevIndex === apps.length - 1);

  return (
    <div className='relative rounded-md sm:h-full h-[280px]'>
      {apps.slice(0, 6).map((app, i) => {
        return (
          <AnimatePresence mode={'popLayout'} key={app?.id}>
            {index === i && (
              <motion.div className='w-[80%] mx-auto h-full'>
                <motion.figure
                  initial={{
                    opacity: 0,
                    y: isForward ? 30 : -30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: isForward ? -30 : 30,
                  }}
                  transition={{
                    type: 'ease',
                    ease: 'easeInOut',
                    duration: 0.3,
                    delay: 0.4,
                  }}
                  className='h-full'
                >
                  <Image
                    src={app?.imgSrc}
                    alt='images'
                    width={1000}
                    height={1000}
                    className='w-full h-full object-contain  rounded-lg'
                  />
                </motion.figure>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}

      <div className='absolute bottom-0 left-0 w-full z-10'>
        <div className='w-fit mx-auto'>
          <TooltipProvider delayDuration={0}>
            <motion.div
              onMouseMove={(e) => mouseX.set(e.pageX)}
              onMouseLeave={() => mouseX.set(Infinity)}
              className='mx-auto flex h-[57px] w-fit items-end gap-2 rounded-t-lg px-2 pb-2  bg-primary-foreground backdrop-blur-2xl border-t border-l border-r  '
            >
              {apps.slice(0, 6).map((app, i) => {
                return (
                  <Tooltip key={app.id}>
                    <TooltipTrigger onClick={() => handleClick(i)}>
                      <span className='sr-only'>{app.name}</span>
                      <AppIcon mouseX={mouseX} src={app.icon} />
                    </TooltipTrigger>
                    <TooltipContent
                      className='py-1 px-3 rounded-sm'
                      sideOffset={8}
                    >
                      <p className='text-xs'>{app.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </motion.div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function AppIcon({ mouseX, src }: { mouseX: MotionValue; src: any }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [40, 55, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <>
      <MotionComponent
        src={src}
        width={60}
        height={60}
        alt=''
        quality={100}
        ref={ref}
        style={{ width }}
        className='aspect-square rounded-lg w-8  object-cover'
      />
    </>
  );
}
export default HomeMagnifiedDocOneFile;
