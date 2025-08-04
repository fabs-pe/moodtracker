import { Fugaz_One, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "../../context/AuthContext";
import Head from "./head";
import Logout from "../../components/Logout";
import JournalButton from "../../components/JournalButton";

// font imports
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fungz = Fugaz_One({subsets: ["latin"], weight: ['400']});

// page title
export const metadata = {
  title: "Mood Tracker ",
  description: "Track your mood everyday",
};

export default function RootLayout({ children }) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href='/'>
      <h1 className={'text-base sm:text-lg textGradient ' + fungz.className}>MoodMate</h1>
      </Link>
      <Logout />
      <JournalButton />
    </header>
  )

  const footer = (
    <footer className={'p-4 sm:p-8 flex  items-center justify-center text-teal-600 text-2xl ' + fungz.className }>
        <div className="flex gap-x-6">       
          <Link href='https://github.com/fabs-pe/moodtracker' > <i className="fa-brands fa-github"></i></Link>
          <Link href='https://www.linkedin.com/in/fabianperre'><i className="fa-brands fa-linkedin"></i></Link>
          <Link href='mailto: fabs.perre@gmail.com'><i className="fa-brands fa-google"></i></Link>
       </div>

    </footer>
  )
  return (
    <html lang="en">
      <Head />
      <AuthProvider>
      <body
        className={ 'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ' 
        +`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {header}
        {children}
        {footer}
      </body>
      </AuthProvider>
    </html>
  );
}
