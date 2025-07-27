import MobileIcons from '@/registry/components/liquid-glass/mobile-icons-liquid';
import NotificationLiquid from '@/registry/components/liquid-glass/notification';
import SidebarMenu from '@/registry/components/liquid-glass/sidebar-menu';
import WeatherLiquid from '@/registry/components/liquid-glass/weather-liquid';
import React from 'react';

function page() {
  return (
    <>
    <div className='grid  2xl:grid-cols-[140px_minmax(0,1fr)] mt-6 lg:whitespace-normal whitespace-nowrap'>
      <h1 className='text-8xl py-24 mb-8'>hello</h1>
      <h1 className='text-5xl'>hello</h1>
      <h1 className='xl:block hidden'>Test Heading</h1>
    
    </div>
    {/* <MobileIcons/>
    <WeatherLiquid/>
    <SidebarMenu/> */}
    <NotificationLiquid/>
    </>
  );
}

export default page;
