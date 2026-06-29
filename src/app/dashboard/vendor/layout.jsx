import { requireRole } from '@/lib/core/session';
import React from 'react';

const RecruiterLayout = async ({ children }) => {
    await requireRole('vendor')
    return children;
};

export default RecruiterLayout;