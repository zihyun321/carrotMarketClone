import React from "react";

/**
 * TypeScript 쓸때만 사용가능
 * 
 */
interface LayoutProps {
    title?: string;
    canGoBack?: boolean;
    hasTabBar?: boolean;
    children: React.ReactNode;
}

/**
 * 
 * @param param0 
 * @returns 
 * @description Layout 컴포넌트를 모든 페이지에 넣을 것임
 */
export default function Layout({
    title, 
    canGoBack, 
    hasTabBar, 
    children
}: LayoutProps) {
    return <div>
        <div className="bg-white w-full text-lg font-medium py-4 fixed text-gray-700 border-b top-0 flex items-center">
            {title ? <span>{title}</span> : null}
        </div>
        {children}
        {hasTabBar ? <nav></nav> : null}
    </div>;
}