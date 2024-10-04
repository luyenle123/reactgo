import React, { Suspense } from 'react';

const ContactUs = React.lazy(() => import('../components/ContactUs/contactus'));

export default function ContactUsPage() {
    return (
        <>
        {/* fallback = {<p>GO GO ContactUs Loading...</p>} */}
            <Suspense>
                <ContactUs/>
            </Suspense>
        </>
    );
};