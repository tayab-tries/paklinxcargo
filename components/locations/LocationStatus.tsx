import React from 'react';
import { Container } from '@/components/ui/Container';
import { Location } from '@/lib/supabase/locations';

export interface LocationStatusProps {
  location: Location;
}

export const LocationStatus: React.FC<LocationStatusProps> = ({ location }) => {
  return (
    <section className="w-full bg-brand-navy py-12 border-b border-border-dark text-white">
      <Container size="narrow">
        <div className="bg-brand-black-deep p-6 rounded-md border border-border-dark space-y-3">
          <div className="text-xs font-mono font-semibold uppercase text-accent tracking-wider">
            Operational Capabilities — {location.name}
          </div>
          <h3 className="text-heading-sm font-bold text-white">Verified Local Capabilities</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Doorstep Pickup: {location.collection_available ? 'Available' : 'Contact Support'}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Export Air Cargo: {location.service_available ? 'Active' : 'Limited'}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Sea Cargo Consolidation: Active</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Local Branch Office: {location.has_physical_branch ? 'Yes' : 'Pickup Desk Only'}</span>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};
