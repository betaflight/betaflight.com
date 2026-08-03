import React, { useState, useEffect } from 'react';
import HomepageFeature from '../components/HomepageFeature';
import BetaflightLayout from '../components/Layout';
import { ResponsiveLine, type Point } from '@nivo/line';
import { themeLight } from '../theme/nivoThemeLight.js';
import { themeDark } from '../theme/nivoThemeDark.js';
import { useColorMode } from '@docusaurus/theme-common';

interface Volume {
  date: string;
  cached: number;
  built: number;
  targets: Target[];
  releases: Release[];
}

interface Target {
  name: string;
  volume: number;
}

interface Release {
  name: string;
  volume: number;
}

interface StatsResponse {
  volumes: Volume[];
}

interface ChartPoint {
  x: string;
  y: number;
}

interface ChartSeries {
  id: string;
  data: ChartPoint[];
}

interface StatsData {
  total: ChartPoint[];
  targets: ChartSeries[];
  releases: ChartSeries[];
}

type MinorChartType = 'targets' | 'releases';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isBreakdown(value: unknown): value is Target {
  return isRecord(value) && typeof value.name === 'string' && typeof value.volume === 'number';
}

function isVolume(value: unknown): value is Volume {
  return (
    isRecord(value) &&
    typeof value.date === 'string' &&
    typeof value.cached === 'number' &&
    typeof value.built === 'number' &&
    Array.isArray(value.targets) &&
    value.targets.every(isBreakdown) &&
    Array.isArray(value.releases) &&
    value.releases.every(isBreakdown)
  );
}

function isStatsResponse(value: unknown): value is StatsResponse {
  return isRecord(value) && Array.isArray(value.volumes) && value.volumes.every(isVolume);
}

async function getStats(): Promise<StatsData> {
  const response = await fetch('https://build.betaflight.com/api/stats');
  if (!response.ok) {
    throw new Error(`Unable to load build statistics (${response.status})`);
  }

  const stats: unknown = await response.json();
  if (!isStatsResponse(stats) || stats.volumes.length === 0) {
    throw new Error('Build statistics have an invalid response format');
  }

  const data = stats.volumes.map((volume: Volume) => ({
    x: new Date(volume.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    y: volume.cached + volume.built,
  }));

  const firstVolume = stats.volumes[0];
  const targets = firstVolume.targets.slice(0, 5).map((target) => ({
    id: target.name,
    data: stats.volumes.map((volume: Volume) => ({
      x: new Date(volume.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      y: volume.targets.find((item) => item.name === target.name)?.volume ?? 0,
    })),
  }));

  const releases = firstVolume.releases.slice(0, 3).map((release) => ({
    id: release.name,
    data: stats.volumes.map((volume: Volume) => ({
      x: new Date(volume.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      y: volume.releases.find((item) => item.name === release.name)?.volume ?? 0,
    })),
  }));

  return {
    total: data,
    targets: targets,
    releases: releases,
  };
}

interface TooltipProps {
  point: Point;
  children: React.ReactNode;
}

const Tooltip = ({ point, children }: TooltipProps) => {
  return (
    <div className="backdrop-blur-xl dark:bg-neutral-700/90 bg-neutral-200 h-fit p-2 rounded-full border-2 dark:border-neutral-500/50 border-neutral-300/50 shadow-xl z-10">
      <span style={{ color: point.serieColor }} className="font-semibold">
        {point.data.yFormatted}
      </span>
      {children}
    </div>
  );
};

interface MajorChartProps {
  data: ChartPoint[] | null;
  maxY: number | null;
}

const MajorChart = ({ data, maxY }: MajorChartProps) => {
  const isDark = useColorMode().isDarkTheme;
  return (
    <div className="h-96 w-full flex">
      {data && maxY !== null ? (
        <ResponsiveLine
          data={[
            {
              id: 'Total',
              data: data.map((dataPoint) => ({
                x: dataPoint.x,
                y: dataPoint.y,
              })),
            },
          ]}
          theme={isDark ? themeDark : themeLight}
          colors={['#FFBB00']}
          lineWidth={4}
          margin={{ top: 0, right: 48, bottom: 48, left: 48 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 2000,
            max: maxY + 1000,
            stacked: true,
            reverse: false,
          }}
          tooltip={({ point }) => <Tooltip point={point}> Builds</Tooltip>}
          areaBaselineValue={2000}
          enableGridX={false}
          enableGridY={true}
          enableArea={true}
          enableCrosshair={false}
          curve="natural"
          yFormat=" >-.0f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 16,
            tickRotation: 0,
          }}
          pointSize={10}
          pointColor={{ from: 'color', modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const MajorChartWrapper = () => {
  const [data, setData] = useState<ChartPoint[] | null>(null);
  const [maxY, setMaxY] = useState<number | null>(null);

  useEffect(() => {
    getStats()
      .then((stats) => {
        const totalData = stats.total;
        if (totalData.length > 0) {
          const yValues = totalData.map((dataPoint) => dataPoint.y);
          const maxBuildCount = Math.max(...yValues);

          setData(totalData);
          setMaxY(maxBuildCount);
        }
      })
      .catch((error: unknown) => console.error(error));
  }, []);

  return <MajorChart data={data} maxY={maxY} />;
};

interface MinorChartProps {
  data: ChartSeries[] | null;
  maxY: number | null;
}

const MinorChart = ({ data, maxY }: MinorChartProps) => {
  const isDark = useColorMode().isDarkTheme;
  return (
    <div className="h-96 w-full flex">
      {data && maxY !== null ? (
        <ResponsiveLine
          data={data.map((target) => ({
            id: target.id,
            data: target.data.map((dataPoint) => ({
              x: dataPoint.x,
              y: dataPoint.y,
            })),
          }))}
          theme={isDark ? themeDark : themeLight}
          enableArea={true}
          areaOpacity={0.1}
          colors={['#5ad8e6', '#87cc52', '#ffcc00', '#ff9742', '#d6395b']}
          lineWidth={2}
          margin={{ top: 48, right: 48, bottom: 72, left: 48 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 1,
            max: maxY + 100,
            stacked: false,
            reverse: false,
          }}
          tooltip={({ point }) => <Tooltip point={point}>{` ${point.serieId}`}</Tooltip>}
          enableGridX={false}
          enableGridY={true}
          enableCrosshair={false}
          curve="natural"
          yFormat=" >-.0f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 16,
            tickRotation: 0,
          }}
          pointSize={6}
          pointColor={{ from: 'color', modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateY: 100,
              itemsSpacing: 32,
              itemDirection: 'top-to-bottom',
              itemWidth: 96,
              itemHeight: 64,
              symbolSize: 10,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

interface MinorChartWrapperProps {
  type: MinorChartType;
}

const MinorChartWrapper = ({ type }: MinorChartWrapperProps) => {
  const [data, setData] = useState<ChartSeries[] | null>(null);
  const [maxY, setMaxY] = useState<number | null>(null);

  useEffect(() => {
    getStats()
      .then((stats) => {
        const filteredData = stats[type];
        const maxCount = Math.max(0, ...filteredData.flatMap((series) => series.data.map((dataPoint) => dataPoint.y)));

        setData(filteredData);
        setMaxY(maxCount);
      })
      .catch((error: unknown) => console.error(error));
  }, [type]);

  return <MinorChart data={data} maxY={maxY} />;
};

export default function Stats() {
  return (
    <BetaflightLayout>
      <div className="xl:max-w-[1920px] w-full p-6 mt-0 xl:mt-16">
        <HomepageFeature blur title="Cloud Build Statistics">
          <div className="flex flex-col w-full h-full">
            <h2 className="text-primary-600 text-xl md:text-2xl font-bold">Total Builds</h2>
            <MajorChartWrapper />
            <div className="flex xl:flex-row flex-col mt-12">
              <div className="xl:w-1/2 w-full">
                <h2 className="text-primary-600 text-xl md:text-2xl font-bold">Top 5 Targets</h2>
                <MinorChartWrapper type="targets" />
              </div>
              <div className="xl:w-1/2 w-full xl:mt-0 mt-12">
                <h2 className="text-primary-600 text-xl md:text-2xl font-bold">Top 3 Releases</h2>
                <MinorChartWrapper type="releases" />
              </div>
            </div>
          </div>
        </HomepageFeature>
      </div>
    </BetaflightLayout>
  );
}
