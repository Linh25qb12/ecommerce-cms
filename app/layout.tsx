import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs'
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { ModalProvider } from '@/provider/modalProvider';
import { ConfigProvider } from 'antd';
import { theme } from '@/lib/theme/themeConfig';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <StyledComponentsRegistry>
                        <ConfigProvider theme={theme}>
                            <ModalProvider />
                            {children}
                        </ConfigProvider>
                    </StyledComponentsRegistry>
                </body>
            </html>
        </ClerkProvider>
    )
}
