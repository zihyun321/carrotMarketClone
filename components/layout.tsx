import React from "react";
import { cls } from "../libs/utils";

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
        <div className="bg-white w-full text-lg font-medium py-3 fixed text-gray-800 border-b top-0 justify-center flex items-center">
            {title ? <span>{title}</span> : null}
        </div>
        <div className={cls("pt-16", hasTabBar ? "pb-16" : "")}>
            {children}
        </div>
        {hasTabBar ? (<nav className="bg-white text-gray-800 border-t fixed bottom-0 pb-10 pt-3 flex justify-between items-center">
        </nav>
        ) : null}
    </div>;
}
