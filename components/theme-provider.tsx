'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { ConfigProvider as AntdConfigProvider, theme as antdTheme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

// 单独的 Antd 主题提供者组件，用于处理 Antd 的主题
function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <AntdConfigProvider
      locale={zhCN}
      theme={{
        algorithm:
          resolvedTheme === 'dark'
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        cssVar: true,
      }}
    >
      {children}
    </AntdConfigProvider>
  );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <AntdThemeProvider>{children}</AntdThemeProvider>
    </NextThemesProvider>
  );
}
