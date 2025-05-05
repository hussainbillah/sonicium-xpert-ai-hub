
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import StatusBadge from './audit/StatusBadge';
import OverviewCharts from './audit/OverviewCharts';
import TechnicalSEOSection from './audit/TechnicalSEOSection';
import OnPageSEOSection from './audit/OnPageSEOSection';
import OffPageSEOSection from './audit/OffPageSEOSection';
import UXAnalyticsSection from './audit/UXAnalyticsSection';

const SEOAuditTab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("technical");

  return (
    <div className="space-y-6">
      <OverviewCharts />

      <Accordion 
        type="single" 
        defaultValue="technical" 
        onValueChange={setActiveCategory} 
        className="space-y-4"
      >
        <AccordionItem value="technical" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex justify-between w-full">
              <span className="font-bold">Technical SEO</span>
              <StatusBadge status="warning" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <TechnicalSEOSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="onpage" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex justify-between w-full">
              <span className="font-bold">OnPage SEO (Product/Category)</span>
              <StatusBadge status="error" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <OnPageSEOSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="offpage" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex justify-between w-full">
              <span className="font-bold">OffPage & Conversion SEO</span>
              <StatusBadge status="ok" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <OffPageSEOSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ux" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex justify-between w-full">
              <span className="font-bold">UX & Analytics</span>
              <StatusBadge status="warning" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <UXAnalyticsSection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SEOAuditTab;
