import { requireRole } from '@/lib/core/session';
import React from 'react';

const RecruiterLayout = async ({ children }) => {
    await requireRole('user')
    return children;
};

export default RecruiterLayout;