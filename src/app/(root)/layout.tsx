import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React, { Suspense } from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Suspense fallback={<div className="h-16" />}>
                <Navbar />
            </Suspense>
            {children}
            <Footer />
        </div>
    );
};

export default layout;

