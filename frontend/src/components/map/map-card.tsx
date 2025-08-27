import { MapIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProvinceSummary } from '@/lib/data/news';
// import { MapData } from './map-data';
import { VectorMap } from './vector-map';

export async function MapCard() {
  const summaryData = await getProvinceSummary();

  return (
    <Card id="map-container">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <MapIcon />
          Articles by Province/City
        </CardTitle>
      </CardHeader>
      <CardContent className="h-fit space-y-4">
        {/* <MapData summaryData={summaryData.data} /> */}
        <VectorMap summaryData={summaryData.data} />
      </CardContent>
    </Card>
  );
}
