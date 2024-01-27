import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider className={`${inter.className} flex flex-row`}>
			<NextThemesProvider attribute="class" defaultTheme="dark">
				<Sidebar></Sidebar>
				<Component {...pageProps} />
			</NextThemesProvider>
		</NextUIProvider>
	);
}
