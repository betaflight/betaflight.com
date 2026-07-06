/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import React from 'react';
import { Save, Cpu, Crosshair, MonitorStop, Rotate3D, Ruler, Thermometer, CircleCheck, LifeBuoy, Clock } from 'lucide-react';
import SpecBox from '../SpecGrid/SpecBox';
import ConnectorLogo from '@site/static/img/betaflight/connector_logo.svg';

export default function VersionInfo({ children }) {
  const { frontMatter } = useDoc();

  type Specs = {
    target: string
    mcu: string
    imu: string
    osd: string
    barometer: string
    blackbox: string
    dimensions: string
    mounting: string
    weight: string
  }

  type Meta = {
    last_updated?: string
    support_url?: string
    betaflight_supported?: boolean
    connector_standard?: boolean
    doc_status?: 'complete' | 'partial' | 'config-only' | 'blocked'
    confidence?: number
  }

  const customProps = (frontMatter.sidebar_custom_props ?? {}) as any;
  const specs = (customProps.specs ?? {}) as Specs;
  const meta = customProps as Meta;

  const dash = (v: string) => (v && String(v).trim() ? v : '—');
  const { target = '', mcu = '', imu = '', osd = '', barometer = '', blackbox: flash = '', dimensions = '', mounting = '', weight = '' } = specs;
  const { last_updated: lastUpdated = '', support_url: supportUrl = '', betaflight_supported: bfSupported = false, connector_standard: connectorStandard = false, doc_status: docStatus = '', confidence } = meta;

  const statusMeta: Record<string, { label: string; cls: string }> = {
    complete: { label: 'Complete', cls: 'bg-green-500/15 text-green-600 dark:text-green-400' },
    partial: { label: 'Partial', cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
    'config-only': { label: 'Config-only', cls: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
    blocked: { label: 'Needs verification', cls: 'bg-red-500/15 text-red-600 dark:text-red-400' },
  };
  const status = statusMeta[docStatus];

  const hasFooter = status || bfSupported || connectorStandard || supportUrl || lastUpdated;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex 2xl:flex-row flex-col gap-2">
        <div className="aspect-square w-full items-center justify-center flex rounded-lg overflow-clip">{children}</div>
        <div className="2xl:aspect-square w-full h-fit grid grid-cols-3 grid-rows-3 gap-2">
          <SpecBox icon={<Crosshair size={24} />} title="Target:" color="primary" colSpan={2}>
            <div className="font-mono">{target}</div>
          </SpecBox>
          <SpecBox icon={<Cpu />} title="MCU:" color="secondary">
            {mcu}
          </SpecBox>
          <SpecBox icon={<Rotate3D />} title="IMU:" color="secondary">
            {dash(imu)}
          </SpecBox>
          <SpecBox icon={<MonitorStop />} title="OSD:" color="neutral">
            {dash(osd)}
          </SpecBox>
          <SpecBox icon={<Thermometer />} title="Baro:" color="neutral-light">
            {dash(barometer)}
          </SpecBox>
          <SpecBox icon={<Save />} title="Blackbox:" color="neutral-light">
            {dash(flash)}
          </SpecBox>
          <SpecBox icon={<Ruler />} title="Measurements:" color="neutral-light" colSpan={2}>
            <div className="flex gap-x-2 flex-wrap">
              <div>Size: {dash(dimensions)}</div>
              <div>Mounting: {dash(mounting)}</div>
              <div>Weight: {dash(weight)}</div>
            </div>
          </SpecBox>
        </div>
      </div>

      {hasFooter && (
        <div className="w-full flex flex-wrap items-center gap-x-4 gap-y-2 text-sm px-1">
          {status && (
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${status.cls}`} title="Documentation status and confidence">
              Docs: {status.label}
              {typeof confidence === 'number' && <span className="opacity-80">· {confidence}%</span>}
            </span>
          )}
          {bfSupported && (
            <span className="inline-flex items-center gap-1 text-primary-500 font-semibold">
              <CircleCheck size={16} /> Betaflight Supported
            </span>
          )}
          {connectorStandard && (
            <span className="inline-flex items-center gap-1 font-semibold" title="Uses the Betaflight Connector Standard">
              <ConnectorLogo className="invertable h-5 w-auto" /> Connector Standard
            </span>
          )}
          {supportUrl && (
            <a href={supportUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
              <LifeBuoy size={16} /> Manufacturer support
            </a>
          )}
          {lastUpdated && (
            <span className="inline-flex items-center gap-1 text-neutral-500 ml-auto">
              <Clock size={16} /> Updated {lastUpdated}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
