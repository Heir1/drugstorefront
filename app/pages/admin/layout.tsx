"use client"
import { Provider } from 'react-redux';
import store from '@/app/redux/store/store';
import Header from "@/app/components/Header";
import MenuTab from '@/app/components/MenuTab';
import { useRouter } from "next/router";

export default function FinanLayout({children,}: {children: React.ReactNode;}) {

  return (
    <Provider store={store}>
      <div className=' mb-40 ' >
          <Header/>
          <div className="flex-grow">{children}</div>
      </div>
    </Provider>
  );
}
