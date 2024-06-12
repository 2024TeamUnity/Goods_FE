import React from 'react';

export default function BottomSheetContent({ children }: { children: React.ReactNode }) {
  return <ul className='p-5 pb-36 h-[90vh] overflow-y-auto'>{children}</ul>;
}
