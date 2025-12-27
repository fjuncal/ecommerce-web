import type { Metadata } from "next";
import Header from "@/ui/layout/Header";
import Footer from "@/ui/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
	title: "Store",
	description: "Generic e-commerce",
};

type RootLayoutProps = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="pt-BR">
			<body>
				<Header />
				<main className="py-8">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
