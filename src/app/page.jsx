import HomePage from '@/components/HomePage';
import { getAdvertise } from '@/lib/api/advertise';
import { getLatestTickets } from '@/lib/api/ticket';
import React from 'react';

export default async function Page() {
  const advertisedTickets = await getAdvertise();
  const latestTickets = await getLatestTickets();
  // console.log(latestTickets)
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full'>
      <HomePage advertisedTickets={advertisedTickets} latestTickets={latestTickets} />
    </div>
  );
}