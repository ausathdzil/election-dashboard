import { CopyIcon, MoreHorizontalIcon } from 'lucide-react';

import Image from 'next/image';

import { TimelineChart } from '@/components/dashboard/timeline-chart';
import { TopSourcesChart } from '@/components/dashboard/top-sources-chart';
import { PageSizeSelect } from '@/components/search/page-size-select';
import { SearchPagination } from '@/components/search/search-pagination';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getNewsTrends, getTopNewsSource } from '@/lib/data/news';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <StatisticsSection />
      <TimelineCard />
      <div className="grid grid-cols-2 gap-4">
        <AdditionalStatistics />
        <TopNewsSourceCard />
        <TopSourceCard />
        <TopSourceEndpointCard />
      </div>
      <APIGatewayLogsSection />
    </main>
  );
}

const statistics = [
  {
    icon: <TotalRequestIcon />,
    title: 'Total Request',
    value: 100,
    description: 'Total of request in the last 30 days',
  },
  {
    icon: <TotalGatewayIcon />,
    title: 'Total Gateway',
    value: 89,
    description: 'Total of existing gateway',
  },
  {
    icon: <TotalSourceIcon />,
    title: 'Total Source',
    value: 622,
    description: 'Total of existing source',
  },
  {
    icon: <TotalUserIcon />,
    title: 'Total User',
    value: 120,
    description: 'Total of existing user',
  },
];

function StatisticsSection() {
  return (
    <section className="flex gap-4">
      {statistics.map((statistic) => (
        <StatisticCard key={statistic.title} {...statistic} />
      ))}
    </section>
  );
}

function StatisticCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  description: string;
}) {
  return (
    <Card className="basis-1/4 border">
      <CardHeader>
        <CardTitle className="space-y-4">
          {icon}
          <span>{title}</span>
        </CardTitle>
        <CardAction className="font-semibold text-2xl">{value}</CardAction>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

async function TimelineCard() {
  const chartData = await getNewsTrends({
    start_date: '2023-01-01',
    end_date: '2023-12-10',
    granularity: 'monthly',
    province: null,
  });

  return (
    <Card>
      <CardHeader>
        <CardDescription>Timeline</CardDescription>
        <CardTitle>Data Timeline</CardTitle>
        <CardAction>
          <Tabs defaultValue="year">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TimelineChart chartData={chartData.data} />
      </CardContent>
    </Card>
  );
}

const additionalStatistics = [
  {
    active: true,
    title: 'Total Token',
    value: 120,
    description: 'Total of all types of existing tokens',
  },
  {
    title: 'Total Active',
    value: 90,
    description: 'Total of tokens that are still active and ready to use',
  },
  {
    title: 'Total Revoke',
    value: 12,
    description: 'Total tokens that have been revoked',
  },
  {
    title: 'Total Expire',
    value: 18,
    description: 'Total of expired tokens that are no longer active',
  },
];

function AdditionalStatistics() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {additionalStatistics.map((statistic) => (
        <AdditionalStatisticCard key={statistic.title} {...statistic} />
      ))}
    </div>
  );
}

function AdditionalStatisticCard({
  active,
  title,
  value,
  description,
}: {
  active?: boolean;
  title: string;
  value: number;
  description: string;
}) {
  return (
    <Card
      className={cn('border', active && 'bg-primary text-primary-foreground')}
    >
      <CardHeader>
        <CardTitle className="flex flex-col gap-4">
          <span className="font-semibold text-3xl">{value}</span>
          <span className="font-normal">{title}</span>
        </CardTitle>
        <CardDescription className={active ? 'text-primary-foreground' : ''}>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

async function TopNewsSourceCard() {
  const chartData = await getTopNewsSource({
    province: null,
  });

  return (
    <Card>
      <CardHeader>
        <CardDescription>Top</CardDescription>
        <CardTitle>News Source</CardTitle>
        <CardAction>
          <Tabs defaultValue="year">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Separator />
        <TopSourcesChart chartData={chartData.data} />
      </CardContent>
    </Card>
  );
}

function TotalRequestIcon() {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Total Request</title>
      <path
        d="M21.6534 4.8667H10.3467C7.05339 4.8667 4.38672 7.5467 4.38672 10.8267V23.3734C4.38672 26.6534 7.06672 29.3334 10.3467 29.3334H21.6401C24.9334 29.3334 27.6001 26.6534 27.6001 23.3734V10.8267C27.6134 7.53337 24.9334 4.8667 21.6534 4.8667Z"
        fill="#5575A5"
        opacity="0.4"
      />
      <path
        d="M19.1333 2.66663H12.8667C11.48 2.66663 10.3467 3.78663 10.3467 5.17329V6.42663C10.3467 7.81329 11.4667 8.93329 12.8533 8.93329H19.1333C20.52 8.93329 21.64 7.81329 21.64 6.42663V5.17329C21.6533 3.78663 20.52 2.66663 19.1333 2.66663Z"
        fill="#5575A5"
      />
      <path
        d="M20 17.6667C19.4533 17.6667 19 18.12 19 18.6667V20.2534L12.7066 13.96C12.32 13.5734 11.68 13.5734 11.2933 13.96C10.9066 14.3467 10.9066 14.9867 11.2933 15.3734L17.5866 21.6667H16C15.4533 21.6667 15 22.12 15 22.6667C15 23.2134 15.4533 23.6667 16 23.6667H20C20.5466 23.6667 21 23.2134 21 22.6667V18.6667C21 18.12 20.5466 17.6667 20 17.6667Z"
        fill="#5575A5"
      />
    </svg>
  );
}

function TotalGatewayIcon() {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Total Gateway</title>
      <path
        d="M14 21.3333H18C21.3333 21.3333 23.3333 18.9333 23.3333 16V9.2133C23.3333 7.8133 22.1866 6.66663 20.7866 6.66663H11.2267C9.82667 6.66663 8.68 7.8133 8.68 9.2133V16C8.66666 18.9333 10.6667 21.3333 14 21.3333Z"
        fill="#5575A5"
        opacity="0.4"
      />
      <path
        d="M13.6666 2.66663V6.66663H11.6666V2.66663C11.6666 2.11996 12.12 1.66663 12.6666 1.66663C13.2133 1.66663 13.6666 2.11996 13.6666 2.66663Z"
        fill="#5575A5"
      />
      <path
        d="M20.3334 2.66663V6.66663H18.3334V2.66663C18.3334 2.11996 18.7867 1.66663 19.3334 1.66663C19.88 1.66663 20.3334 2.11996 20.3334 2.66663Z"
        fill="#5575A5"
      />
      <path
        d="M17 21.3334V29.3334C17 29.88 16.5467 30.3334 16 30.3334C15.4533 30.3334 15 29.88 15 29.3334V21.3334H17Z"
        fill="#5575A5"
      />
    </svg>
  );
}

function TotalSourceIcon() {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Total Source</title>
      <path
        d="M21.5868 2.66663H10.4134C5.56008 2.66663 2.66675 5.55996 2.66675 10.4133V21.5733C2.66675 26.44 5.56008 29.3333 10.4134 29.3333H21.5734C26.4268 29.3333 29.3201 26.44 29.3201 21.5866V10.4133C29.3334 5.55996 26.4401 2.66663 21.5868 2.66663Z"
        fill="#5575A5"
        opacity="0.4"
      />
      <path
        d="M12.8 21.04C12.5467 21.04 12.2933 20.9467 12.0933 20.7467L8.77335 17.4267C7.98668 16.64 7.98668 15.3734 8.77335 14.5867L12.0933 11.2667C12.48 10.88 13.12 10.88 13.5067 11.2667C13.8933 11.6534 13.8933 12.2934 13.5067 12.68L10.1867 16L13.5067 19.3334C13.8933 19.72 13.8933 20.36 13.5067 20.7467C13.3067 20.9334 13.0533 21.04 12.8 21.04Z"
        fill="#5575A5"
      />
      <path
        d="M19.2 21.04C18.9467 21.04 18.6934 20.9467 18.4934 20.7467C18.1067 20.36 18.1067 19.72 18.4934 19.3334L21.8134 16L18.4934 12.6667C18.1067 12.28 18.1067 11.64 18.4934 11.2534C18.88 10.8667 19.52 10.8667 19.9067 11.2534L23.2267 14.5734C24.0134 15.36 24.0134 16.6267 23.2267 17.4134L19.9067 20.7334C19.72 20.9334 19.4534 21.04 19.2 21.04Z"
        fill="#5575A5"
      />
    </svg>
  );
}

function TotalUserIcon() {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Total User</title>
      <path
        d="M16.0001 2.66663C12.5067 2.66663 9.66675 5.50663 9.66675 8.99996C9.66675 12.4266 12.3467 15.2 15.8401 15.32C15.9467 15.3066 16.0534 15.3066 16.1334 15.32C16.1601 15.32 16.1734 15.32 16.2001 15.32C16.2134 15.32 16.2134 15.32 16.2267 15.32C19.6401 15.2 22.3201 12.4266 22.3334 8.99996C22.3334 5.50663 19.4934 2.66663 16.0001 2.66663Z"
        fill="#5575A5"
        opacity="0.4"
      />
      <path
        d="M22.7733 18.8667C19.0533 16.3867 12.9866 16.3867 9.23995 18.8667C7.54661 20 6.61328 21.5334 6.61328 23.1734C6.61328 24.8134 7.54661 26.3334 9.22661 27.4534C11.0933 28.7067 13.5466 29.3334 15.9999 29.3334C18.4533 29.3334 20.9066 28.7067 22.7733 27.4534C24.4533 26.32 25.3866 24.8 25.3866 23.1467C25.3733 21.5067 24.4533 19.9867 22.7733 18.8667Z"
        fill="#5575A5"
      />
    </svg>
  );
}

const topSource = [
  {
    label: 'Tokopedia',
    url: 'https://tokopedia.com',
    value: 84,
    logo: '/images/tokopedia.png',
  },
  {
    label: 'Shopee',
    url: 'https://shopee.com',
    value: 84,
    logo: '/images/shopee.png',
  },
  {
    label: 'Bukalapak',
    url: 'https://bukalapak.com',
    value: 84,
    logo: '/images/bukalapak.png',
  },
  {
    label: 'detik.com',
    url: 'https://detik.com',
    value: 84,
    logo: '/images/detik.png',
  },
  {
    label: 'liputan6',
    url: 'https://liputan6.com',
    value: 84,
    logo: '/images/liputan6.png',
  },
  {
    label: 'Tokopedia',
    url: 'https://tokopedia.com',
    value: 84,
    logo: '/images/tokopedia.png',
  },
  {
    label: 'Bukalapak',
    url: 'https://bukalapak.com',
    value: 84,
    logo: '/images/bukalapak.png',
  },
  {
    label: 'bola.id',
    url: 'https://bola.id',
    value: 84,
    logo: '/images/bolaid.png',
  },
  {
    label: 'Wikipedia',
    url: 'https://wikipedia.com',
    value: 84,
    logo: '/images/wikipedia.png',
  },
  {
    label: 'bola.id',
    url: 'https://bola.id',
    value: 84,
    logo: '/images/bolaid.png',
  },
];

function TopSourceCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Top</CardDescription>
        <CardTitle>Source</CardTitle>
        <CardAction>
          <Tabs defaultValue="year">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Separator className="mb-2" />
        <Table>
          <TableBody>
            {topSource.map((item, index) => (
              <TableRow className="border-none" key={index}>
                <TableCell>
                  <Image
                    alt={item.label}
                    height={24}
                    src={item.logo}
                    width={24}
                  />
                </TableCell>
                <TableCell>{item.label}</TableCell>
                <TableCell>{item.url}</TableCell>
                <TableCell className="text-right font-semibold text-primary">
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const topSourceEndpoint = [
  {
    url: '/tokopedia/search_product',
    value: 84,
  },
  {
    url: '/search_engine/search',
    value: 84,
  },
  {
    url: '/tokopedia/get_filter',
    value: 84,
  },
  {
    url: '/tokopedia/get_city',
    value: 84,
  },
  {
    url: '/shopee/get_city',
    value: 84,
  },
  {
    url: '/bukalapak/get_city',
    value: 84,
  },
  {
    url: '/detik/get_city',
    value: 84,
  },
  {
    url: '/tokopedia/get_city',
    value: 84,
  },
  {
    url: '/search_engine/search',
    value: 84,
  },
  {
    url: '/search_engine/search',
    value: 84,
  },
];

function TopSourceEndpointCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Top</CardDescription>
        <CardTitle>Source Endpoint</CardTitle>
        <CardAction>
          <Tabs defaultValue="year">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Separator className="mb-2" />
        <Table>
          <TableBody>
            {topSourceEndpoint.map((item, index) => (
              <TableRow className="h-10 border-none" key={index}>
                <TableCell>{item.url}</TableCell>
                <TableCell className="text-right font-semibold text-primary">
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const logs = [
  {
    user: {
      name: 'James Maddison',
      username: 'jamesmaddison',
      image: '/images/james-maddison.png',
    },
    path: {
      name: 'search_engine/search',
      type: 'json_params',
    },
    endpoint: '/tiktok/downloader',
    token: {
      value: 'MTAwODdkNjhhZDcyNDZm',
      type: 'Social Media',
    },
    status: 200,
    execute_time: 100,
  },
  {
    user: {
      name: 'Albert Flores',
      username: 'alfloor',
      image: '/images/albert-flores.png',
    },
    path: {
      name: 'search_engine/search',
      type: 'json_params',
    },
    endpoint: '/tokopedia/search-product',
    token: {
      value: 'MTAwODdkNjhhZDcyNDZm',
      type: 'News',
    },
    status: 404,
    execute_time: 100,
  },
  {
    user: {
      name: 'Leslie Alexander',
      username: 'lesliealex',
      image: '/images/leslie-alexander.png',
    },
    path: {
      name: 'search_engine/search',
      type: 'json_params',
    },
    endpoint: '/tokopedia/get-filter',
    token: {
      value: 'MTAwODdkNjhhZDcyNDZm',
      type: 'Wikipedia',
    },
    status: 500,
    execute_time: 100,
  },
  {
    user: {
      name: 'Jenny Wilson',
      username: 'jennywils',
      image: '/images/jenny-wilson.png',
    },
    path: {
      name: 'search_engine/search',
      type: 'json_params',
    },
    endpoint: '/tokopedia/get-city',
    token: {
      value: 'MTAwODdkNjhhZDcyNDZm',
      type: 'Social Media',
    },
    status: 200,
    execute_time: 100,
  },
  {
    user: {
      name: 'Marvin McKinney',
      username: 'marvinkin',
      image: '/images/marvin-mckinney.png',
    },
    path: {
      name: 'search_engine/search',
      type: 'json_params',
    },
    endpoint: '/tiktok/downloader',
    token: {
      value: 'MTAwODdkNjhhZDcyNDZm',
      type: 'Social Media',
    },
    status: 200,
    execute_time: 100,
  },
];

function APIGatewayLogsSection() {
  return (
    <section className="flex flex-col gap-8 py-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">API Gateway Logs</h2>
        <div className="flex size-9 items-center justify-center rounded-md border border-primary">
          <FilterIcon />
        </div>
      </div>
      <div className="max-w-full overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="[&>*:not(:last-child)]:border-r [&>*]:h-12 [&>*]:p-2">
              <TableHead>
                <Button className="w-full justify-between" variant="ghost">
                  NO <ExpandIcon />
                </Button>
              </TableHead>
              <TableHead>
                <Button className="w-full justify-between" variant="ghost">
                  USER <ExpandIcon />
                </Button>
              </TableHead>
              <TableHead>
                <Button className="w-full justify-between" variant="ghost">
                  PATH <ExpandIcon />
                </Button>
              </TableHead>
              <TableHead>
                <Button className="w-full justify-between" variant="ghost">
                  ENDPOINT <ExpandIcon />
                </Button>
              </TableHead>
              <TableHead>
                <Button className="w-full justify-between" variant="ghost">
                  TOKEN <ExpandIcon />
                </Button>
              </TableHead>
              <TableHead>
                <Button className="w-full justify-between" variant="ghost">
                  STATUS <ExpandIcon />
                </Button>
              </TableHead>
              <TableHead>
                <Button className="w-full justify-between" variant="ghost">
                  EXECUTE TIME <ExpandIcon />
                </Button>
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow
                className="[&>*]:h-24 [&>*]:p-2"
                key={log.user.username}
              >
                <TableCell className="!pl-6">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-10">
                      <AvatarImage alt={log.user.name} src={log.user.image} />
                    </Avatar>
                    <div className="flex flex-col">
                      <p>{log.user.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {log.user.username}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p>{log.path.name}</p>
                  <p className="text-muted-foreground text-xs">
                    ({log.path.type})
                  </p>
                </TableCell>
                <TableCell>{log.endpoint}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <p>{log.token.value}</p>
                    <CopyIcon className="size-4 stroke-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {log.token.type}
                  </p>
                </TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell>{log.execute_time}ms</TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontalIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator />
        <div className="flex items-center gap-2 p-4">
          <PageSizeSelect className="w-fit text-primary" initialSize="5" />
          <SearchPagination
            count={254}
            has_next
            has_prev={false}
            page={1}
            size={5}
            total_pages={3}
          />
        </div>
      </div>
    </section>
  );
}

function FilterIcon() {
  return (
    <svg
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Filter</title>
      <path
        d="M4.04981 1.575H13.9498C14.7748 1.575 15.4498 2.25 15.4498 3.075V4.725C15.4498 5.325 15.0748 6.075 14.6998 6.45L11.4748 9.3C11.0248 9.675 10.7248 10.425 10.7248 11.025V14.25C10.7248 14.7 10.4248 15.3 10.0498 15.525L8.99981 16.2C8.02481 16.8 6.67481 16.125 6.67481 14.925V10.95C6.67481 10.425 6.37481 9.75 6.07481 9.375L3.2248 6.375C2.8498 6 2.5498 5.325 2.5498 4.875V3.15C2.5498 2.25 3.2248 1.575 4.04981 1.575Z"
        stroke="#5575A5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M8.1975 1.575L4.5 7.5"
        stroke="#5575A5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      fill="none"
      height="13"
      viewBox="0 0 12 13"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Expand</title>
      <path d="M9 5L6 2L3 5H9ZM9 8L6 11L3 8H9Z" fill="#33353D" />
    </svg>
  );
}
