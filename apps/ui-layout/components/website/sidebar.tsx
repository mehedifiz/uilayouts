'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/website/ui/scroll-area';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Atom,
  ChevronsDown,
  Component,
  MousePointerClick,
  PenTool,
  Rocket,
  X,
} from 'lucide-react';
import { IRecentPage, useRecentPagesStore } from '@/hooks/useZustStore';
import { useTheme } from 'next-themes';
import { MainComponents, SpecialComponents } from '@/configs/docs';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { useMediaQuery } from '@/hooks/use-media-query';

export const basePath = [
  {
    href: '/get-started',
    name: 'Get Started',
    icon: <Rocket />,
  },
  {
    href: '/components',
    name: 'Components',
    icon: <Component />,
  },
];

function DocsSidebar() {
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 992px)');

  const { addVisitedPage, getRecentPages, removeAllRecentPages } =
    useRecentPagesStore();
  const [recentPages, setRecentPages] = useState<IRecentPage[]>([]);
  const groupedComponents = MainComponents.reduce(
    (acc: Record<string, any[]>, component) => {
      const group = component.component || null;
      // @ts-ignore
      if (!acc[group]) {
        // @ts-ignore
        acc[group] = [];
      }
      // @ts-ignore
      acc[group].push(component);
      return acc;
    },
    {}
  );

  const handleRemoveAllRecentData = () => {
    removeAllRecentPages();
    setRecentPages([]);
  };

  useEffect(() => {
    const recentPage = getRecentPages();
    setRecentPages(recentPage);
  }, [getRecentPages]);

  return (
    <>
      {isDesktop && (
        <aside className='h-full'>
          <div className='sticky top-16 h-screen w-full pt-3'>
            <ScrollArea className='h-[98%] px-3 py-3 dark:bg-black/40 bg-zinc-100 backdrop-blur-md rounded-md border'>
              <ul className='pb-1'>
                {basePath?.map((link, index) => (
                  <li key={`id-${index}`}>
                    <Link
                      href={link.href}
                      onClick={() => addVisitedPage(link.href, link.name)}
                      className={`flex gap-2 group font-medium items-center py-1 transition-all ${
                        link.href === pathname
                          ? 'active-nav'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      {React.cloneElement(link?.icon, {
                        className: `${
                          link.href === pathname
                            ? 'dark:text-black dark:bg-white bg-black text-white'
                            : 'dark:bg-gray-800 dark:text-white group-hover:bg-black group-hover:text-white  dark:group-hover:bg-white dark:group-hover:text-black'
                        } h-7 w-7 border transition-all rounded-md p-1`,
                      })}

                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={'https://tools.ui-layouts.com/'}
                    target='_blank'
                    className={`flex gap-2 group font-medium items-center py-1  transition-all text-slate-600 hover:text-slate-900  dark:text-slate-400 dark:hover:text-white`}
                  >
                    <PenTool
                      className={`dark:bg-gray-800 dark:text-white group-hover:bg-black group-hover:text-white  dark:group-hover:bg-white dark:group-hover:text-black h-7 w-7 border transition-all rounded-md p-1`}
                    />
                    Tools
                    <span className='text-xs font-normal inline-block -translate-y-2 text-blue-600 '>New</span>
                  </a>
                </li>
                <li>
                  <a
                    href={'https://cursify.vercel.app'}
                    target='_blank'
                    className={`flex gap-2 group font-medium items-center py-1  transition-all text-slate-600 hover:text-slate-900  dark:text-slate-400 dark:hover:text-white`}
                  >
                    <MousePointerClick
                      className={`dark:bg-gray-800 dark:text-white group-hover:bg-black group-hover:text-white  dark:group-hover:bg-white dark:group-hover:text-black  h-7 w-7 border transition-all rounded-md p-1`}
                    />
                    Cursify
                  </a>
                </li>
              </ul>

              {recentPages.length > 0 && (
                <div className='relative'>
                  <div className='flex justify-between items-center'>
                    <h1 className='xl:text-lg text-[1.05rem] font-semibold pb-1'>
                      Recent Visited
                    </h1>
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={handleRemoveAllRecentData}
                            className='xl:h-7 h-5 xl:w-7 w-5 rounded-md dark:bg-gray-900 bg-gray-100 grid place-content-center'
                          >
                            <X className={`h-5 w-5 transition-all`} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className='border px-1 z-10 bg-primary-foreground'>
                          <p>Remove</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <ul>
                    {recentPages.map((page) => (
                      <li
                        key={page.id}
                        className={`font-normal 2xl:text-sm xl:text-[0.81em] text-xs flex items-center dark:hover:text-white py-1 pl-2 border-l transition-all ${
                          page.id === pathname
                            ? 'dark:border-white border-black text-black dark:text-white font-semibold'
                            : 'dark:text-slate-400 hover:border-black/60 dark:hover:border-white/50 text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <Link
                          href={page.id}
                          onClick={() => addVisitedPage(page.id, page.name)}
                        >
                          {page.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <h1 className='xl:text-lg text-[1.05rem] font-semibold pb-1'>
                Components
              </h1>

              {SpecialComponents?.map((link) => (
                <li
                  key={link.href}
                  className={`2xl:text-sm xl:text-[0.81em] text-xs flex items-center gap-1 dark:hover:text-white 2xl:py-1 py-0.5 pl-2 border-l transition-all ${
                    link.href === pathname
                      ? 'dark:border-white border-black text-black dark:text-white font-semibold'
                      : 'dark:text-slate-400 2xl:font-normal font-medium hover:border-black/60 dark:hover:border-white/50 text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Link
                    href={link.href}
                    onClick={() => addVisitedPage(link.href, link.name)}
                  >
                    {link.name}
                  </Link>

                  {link?.updated && (
                    <span className='2xl:text-xs text-[0.74em] bg-green-500 text-white px-1 rounded'>
                      Updated
                    </span>
                  )}

                  {link?.new && (
                    <span className='2xl:text-xs text-[0.74em] bg-blue-500 text-white px-1 rounded'>
                      New
                    </span>
                  )}
                </li>
              ))}

              {Object.entries(groupedComponents).map(
                ([group, items], index) => (
                  <ItemsWithName
                    group={group}
                    items={items}
                    key={index}
                    pathname={pathname}
                    addVisitedPage={addVisitedPage}
                  />
                )
              )}
            </ScrollArea>
          </div>
        </aside>
      )}
    </>
  );
}

export const ItemsWithName = ({
  group,
  items,
  pathname,
  addVisitedPage,
}: {
  group: string | null;
  items: any[];
  pathname: string;
  addVisitedPage: (href: string, name: string) => void;
}) => {
  const [expandedItems, setExpandedItems] = useState<boolean>(true);

  const groupRef = useRef<HTMLDivElement>(null);
  const showExpandButton = items.length > 2;
  const itemsToShow =
    expandedItems || !showExpandButton ? items : items.slice(0, 2);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const activeItemIndex = items.findIndex(
      (item: { href: string }) => item.href === pathname
    );

    if (activeItemIndex !== -1 && itemRefs.current[activeItemIndex]) {
      itemRefs.current[activeItemIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [pathname, items]);

  return (
    <div ref={groupRef} key={group}>
      <div className='text-[1rem] relative flex w-full items-center justify-between pr-4 cursor-pointer dark:font-normal dark:text-gray-100 font-normal capitalize my-1'>
        {group}
        {showExpandButton && (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <button
                  className='h-7 w-7 rounded-md dark:bg-gray-900 bg-gray-100 grid place-content-center absolute top-0 right-3'
                  onClick={() => setExpandedItems(!expandedItems)}
                >
                  <ChevronsDown
                    className={`h-5 w-5 transition-all ${
                      !expandedItems && showExpandButton
                        ? 'rotate-180'
                        : 'rotate-0'
                    }`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent className='dark:bg-primary-base bg-gray-50 text-primary border 2xl:text-base text-sm rounded-md px-2 py-1 -translate-y-1'>
                <p className='capitalize'>
                  {expandedItems ? 'Collapse' : 'Expand'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <ul className='relative'>
        {!expandedItems && showExpandButton && (
          <div className='absolute w-full bottom-0 left-0 h-7 bg-gradient-to-t dark:from-[#050507] from-zinc-100 from-20%' />
        )}
        {itemsToShow.map((link, index) => (
          <li
            key={link.href}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`2xl:text-sm xl:text-[0.81em] text-xs flex items-center gap-1 dark:hover:text-white 2xl:py-1 py-1 pl-2 border-l transition-all ${
              link.href === pathname
                ? 'dark:border-white border-black text-black dark:text-white font-semibold'
                : 'dark:text-slate-400 2xl:font-normal font-medium hover:border-black/60 dark:hover:border-white/50 text-slate-500 hover:text-slate-900'
            }`}
          >
            <Link
              href={link.href}
              onClick={() => addVisitedPage(link.href, link.name)}
            >
              {link.name}
            </Link>
            {link?.updated && (
              <span className='2xl:text-xs text-[0.74em] bg-green-500 text-white px-1 rounded'>
                Updated
              </span>
            )}
            {link?.new && (
              <span className='2xl:text-xs text-[0.74em] bg-blue-500 text-white px-1 rounded'>
                New
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocsSidebar;
