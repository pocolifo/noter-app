import { Inter } from 'next/font/google';
import './globals.css';

import NotificationHandler from './components/notification/notification';
import { NotificationProvider } from './components/notification/notificationcontext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<NotificationProvider>
				<body className={inter.className}>
					<NotificationHandler />

					{children}
				</body>
			</NotificationProvider>
		</html>
	);
}
