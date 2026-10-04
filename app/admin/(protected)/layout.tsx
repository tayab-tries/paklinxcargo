import React from 'react';
import { requireAdminAuth } from '@/lib/supabase/auth-guard';
import { AdminSidebarNav } from '@/components/admin/AdminSidebarNav';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  // Enforce Server-Side Auth Guard for all protected operational admin routes
  const authUser = await requireAdminAuth();

  return (
    <AdminSidebarNav userProfile={authUser.profile}>
      {children}
    </AdminSidebarNav>
  );
}
