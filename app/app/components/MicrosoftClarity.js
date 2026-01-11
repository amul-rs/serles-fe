'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export default function MicrosoftClarity() {
    useEffect(() => {
        // Initialize Microsoft Clarity
        // Project ID from your Clarity dashboard
        const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'uzsffqdumw';

        try {
            Clarity.init(clarityProjectId);
            console.log('Microsoft Clarity initialized successfully with project ID:', clarityProjectId);
        } catch (error) {
            console.error('Failed to initialize Microsoft Clarity:', error);
        }
    }, []);

    return null; // This component doesn't render anything
}
