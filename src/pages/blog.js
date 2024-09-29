import React, { Suspense } from 'react';
const BlogList = React.lazy(() => import('../components/Blog/list'));

export default function BlogPage() {
    return (
        <>
            <Suspense fallback = {<p>Loading...</p>}>
                <BlogList/>
            </Suspense>
        </>
    );
};