import React, { Suspense } from 'react';
const BlogList = React.lazy(() => import('../components/Blog/list'));

export default function BlogPage() {
    return (
        <>
         {/* fallback = {<p>GO GO Blog Loading...</p>} */}
            <Suspense>
                <BlogList/>
            </Suspense>
        </>
    );
};