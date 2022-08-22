import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

// 데이터 return
const fetcher = (url:string) => fetch(url).then((response) => response.json());
export default function useUser() {
    const {data, error} = useSWR("/api/users/me", fetcher);
    const router = useRouter();
    useEffect(() => {
        if (data && !data.ok) {
            router.replace("/enter");
        }
    }, [data, router])
    // const [user, setUser] = useState();
    // useEffect(() => {
    //     fetch("/api/users/me")
    //         .then(response => response.json())
    //         .then((data) => {
    //             // User Login 안했을 경우, 로그인 페이지로 redirect
    //             if (!data.ok) {
    //                 /**
    //                  * push: 이전 페이지에 대한 히스토리 남기고 싶을때
    //                  * replace: 남기고 싶지 않을때. 즉, 히스토리 스택에 새 URL 항목을 추가하는 것 방지
    //                  *          (= 이것은 우리가 이전에 접근하려했던 페이지가 아예 없어 보이는 것처럼 만들 수 있음)
    //                  * 브라우저에서는 페이지가 성공적으로 로드되었을 때 히스토리를 남긴다.
    //                  * 하지만 404, 401처럼 페이지에서 찾지 못했다는 코드를 받게되면 브라우저에서 히스토리를 남기지 않는다.
    //                  */
    //                 return router.replace("/enter");
    //             }
    //             // User Login 했을 경우
    //             setUser(data.profile);
    //         });
    // }, [router]);
    return { user: data?.profile, isLoading: !data && !error };
}