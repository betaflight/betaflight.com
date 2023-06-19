import React, { useState, useEffect } from 'react';
import HomepageFeature from '../components/HomepageFeature';
import BetaflightLayout from '../components/Layout';
import { ResponsiveLine } from '@nivo/line';
import { theme } from './nivoTheme.js';

interface Volume {
  date: string
  cached: number
  built: number
  failed: number
  percentCached: number
  percentSuccess: number
  targets: Target[]
  releases: Release[]
}

interface Target {
  name: string
  percent: number
  volume: number
}

interface Release {
  name: string
  percent: number
  volume: number
}

async function getStats() {
  const stats = await fetch(`https://build.betaflight.com/api/stats`).then((res) => res.json());
  const data = stats.volumes.map((volume: Volume) => ({
    x: new Date(volume.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    y: volume.cached,
  }));
  data.reverse();

  const targets = stats.volumes[0].targets.map((target: Target) => ({
    id: target.name,
    data: stats.volumes
      .map((volume: Volume) => ({
        x: new Date(volume.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        y: volume.targets.find((t: Target) => t.name === target.name)?.volume,
      }))
      .reverse(),
  }));

  const releases = stats.volumes[0].releases.map((release: Release) => ({
    id: release.name,
    data: stats.volumes
      .map((volume: Volume) => ({
        x: new Date(volume.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        y: volume.releases.find((r: Release) => r.name === release.name)?.volume,
      }))
      .reverse(),
  }));

  targets.length = 3;
  releases.length = 3;

  return {
    total: data,
    targets: targets,
    releases: releases,
  };
}

const MajorChart = () => {
  const [data, setData] = useState(null);
  const [maxY, setMaxY] = useState(null);

  useEffect(() => {
    getStats().then((stats) => {
      const totalData = stats.total;

      if (totalData) {
        const yValues = totalData.map((dataPoint) => dataPoint.y);
        const maxBuildCount = Math.max(...yValues);

        setData(totalData);
        setMaxY(maxBuildCount);
      }
    });
  }, []);

  return (
    <div className="h-96 w-full flex">
      {data ? (
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
          theme={theme}
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
          tooltip={({ point }) => {
            return (
              <div className="backdrop-blur-xl bg-neutral-700/90 h-fit p-2 rounded-full border-2 border-neutral-500/50 shadow-xl z-10">
                <span className="text-primary-400 font-semibold">{point.data.yFormatted}</span> Builds
              </div>
            );
          }}
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

const MinorChart = ({ type }) => {
  const [data, setData] = useState(null);
  const [maxY, setMaxY] = useState(null);

  useEffect(() => {
    getStats().then((stats) => {
      let filteredData = null;
      let maxCount = null;

      if (type === 'releases') {
        filteredData = stats.releases;
        maxCount = Math.max(
          ...stats.releases.map((release) => {
            return Math.max(...release.data.map((dataPoint) => dataPoint.y));
          }),
        );
      } else if (type === 'targets') {
        filteredData = stats.targets;
        maxCount = Math.max(
          ...stats.targets.map((target) => {
            return Math.max(...target.data.map((dataPoint) => dataPoint.y));
          }),
        );
      }

      setData(filteredData);
      setMaxY(maxCount);
    });
  }, [type]);

  return (
    <div className="h-96 w-full flex">
      {data ? (
        <ResponsiveLine
          data={data.map((target) => ({
            id: target.id,
            data: target.data.map((dataPoint) => ({
              x: dataPoint.x,
              y: dataPoint.y,
            })),
          }))}
          theme={theme}
          enableArea={true}
          colors={['#5ad8e6', '#87cc52', '#FF5E5E']}
          lineWidth={4}
          margin={{ top: 48, right: 48, bottom: 64, left: 48 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 1,
            max: maxY + 100,
            stacked: false,
            reverse: false,
          }}
          tooltip={({ point }) => {
            return (
              <div className="backdrop-blur-xl bg-neutral-700/90 h-fit p-2 rounded-full border-2 border-neutral-500/50 shadow-xl z-10">
                <span style={{ color: point.serieColor }} className="font-semibold">
                  {point.data.yFormatted}
                </span>{' '}
                {point.serieId}
              </div>
            );
          }}
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
          pointSize={12}
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
              translateY: 64,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 164,
              itemHeight: 20,
              symbolSize: 12,
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

export default function Stats() {
  return (
    <BetaflightLayout>
      <div className="relative w-full mt-4 xl:mt-32">
        <div className="w-full h-fit flex flex-col justify-start">
          <div className="flex flex-col p-6 h-fit w-fit xl:ml-12">
            <h1 className="md:text-[6rem] text-6xl border-primary-500 font-bold mb-4">Stats</h1>
            <h2 className="text-white font-semibold md:text-3xl text-xl">Cloud Build Statistics</h2>
          </div>
        </div>
      </div>
      <div className="xl:max-w-[1920px] w-full m-auto p-4 xl:p-16">
        <HomepageFeature title="Stats">
          <div className="flex flex-col w-full h-full">
            <h2 className="text-primary-500 text-3xl font-bold">Total Builds</h2>
            <MajorChart />
            <div className="flex xl:flex-row flex-col mt-12">
              <div className="xl:w-1/2 w-full">
                <h2 className="text-primary-500 text-3xl font-bold">Top 3 Targets</h2>
                <MinorChart type="targets" />
              </div>
              <div className="xl:w-1/2 w-full xl:mt-0 mt-12">
                <h2 className="text-primary-500 text-3xl font-bold">Top 3 Releases</h2>
                <MinorChart type="releases" />
              </div>
            </div>
          </div>
        </HomepageFeature>
      </div>
    </BetaflightLayout>
  );
}
